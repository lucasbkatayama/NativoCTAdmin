import firebase from 'firebase';
import {
  STUDENT_CREATE,
  CREATE_FAIL,
  LOADING,
  MODAL,
  STUDENTS_FETCH_SUCCESS,
  FORM_CHANGED,
  CONTRIBUTORS_FETCH_SUCCESS
} from './types';

export const studentCreate =
({ s_email, s_password, name, phone, days, plan, family_plan, contributor, parcel, parcel_number }) => {
  let payPlan = plan;
  let sponsor = '';
  const availableDays = days * 4;

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  const day = today.getDate();
  let bills = {};

  if (family_plan === 'beneficiario' && contributor != null) {
    payPlan = contributor.plan;
    sponsor = contributor.sponsor;
  }

  return (dispatch) => {
    dispatch({ type: LOADING });

    firebase.auth().signOut();

    firebase.auth().createUserWithEmailAndPassword(s_email, s_password)
      .then((user) => {
        // Após criar usuário, é cadastrado os pagamentos de seu plano
        firebase.database().ref(`/payments/values/${payPlan}/${days}`)
          .on('value', snapshot => {
          if (parcel) {
            for (let i = 1; i <= parcel_number; i++) {
              if (month + i === 12 && day < 10) {
                month = 0;
                year++;
              } else month++;
              const expiration_date = new Date(year, month, 10).getTime();
              bills[expiration_date] = {
                value: snapshot.val().normal / parcel_number,
                pay_date: '',
                status: 'Em aberto',
              };
              firebase.database().ref('/payments/bills').push({
                expiration_date,
                value: snapshot.val().normal / parcel_number,
                pay_date: '',
                status: 'Em aberto',
                name,
                parcel_number: i,
                id: user.user.uid,
                payed: false,
                payPlan,
                days,
              });
              console.log('Entrou no for');
            }
          } else {
              if (month + 1 === 12 && day < 10) {
                month = 0;
                year++;
              } else month++;
              const expiration_date = new Date(year, month, 10).getTime();
              bills[expiration_date] = {
                value: snapshot.val().normal,
                pay_date: '',
                status: 'Em aberto',
                name,
              };
              firebase.database().ref('/payments/bills').push({
                expiration_date,
                value: snapshot.val().normal,
                pay_date: '',
                status: 'Em aberto',
                name,
                id: user.user.uid,
                payed: false,
                payPlan,
                days,
              });
            }
          // Dados do usuário armazenados no banco
          firebase.database().ref(`/users/${user.user.uid}`)
          .set({
            s_email,
            name,
            phone,
            days,
            availableDays,
            status: 'Ativo',
            payPlan,
            parcel,
            family_plan,
            sponsor,
            date: (Date.now()),
            bills
          })
          .then(() => {
            if (family_plan === 'contribuinte') {
              firebase.database().ref('/contribuintes')
              .push({
                sponsor: name,
                days,
                plan,
                date: (Date.now()),
                members: 0
              });
            }
            if (family_plan === 'beneficiario') {
              const memberNumber = contributor.members;
              const uid = contributor.uid;
              const reference = firebase.database().ref(`/contribuintes/${uid}`);
              reference.update({ members: memberNumber + 1 });
              reference.push({ name });
            }
            dispatch({ type: STUDENT_CREATE });
          });
        });
      }).catch(() => dispatch({ type: CREATE_FAIL }));
  };
};

export const formChanged = ({ prop, value }) => {
  return {
    type: FORM_CHANGED,
    payload: { prop, value }
  };
};

export const modalVisibility = (visible) => {
  return {
    type: MODAL,
    payload: visible
  };
};

export const contributorsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/contribuintes')
    .on('value', snapshot => {
      dispatch({ type: CONTRIBUTORS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const studentsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/users')
    .on('value', snapshot => {
      dispatch({ type: STUDENTS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const billsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/payments/bills')
    .on('value', snapshot => {
      dispatch({ type: FORM_CHANGED, payload: { prop: 'bills', value: snapshot.val() } });
    });
  };
};
