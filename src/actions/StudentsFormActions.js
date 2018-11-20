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
({ s_email, s_password, name, phone, days, plan, family_plan, contributor, parcel }) => {
  let payPlan = plan;
  let sponsor = '';
  const availableDays = days * 4;

  if (family_plan === 'beneficiario' && contributor != null) {
    payPlan = contributor.plan;
    sponsor = contributor.sponsor;
  }

  return (dispatch) => {
    dispatch({ type: LOADING });

    firebase.auth().signOut();
    firebase.auth().createUserWithEmailAndPassword(s_email, s_password)
      .then((user) => {
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
            date: (Date.now())
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
