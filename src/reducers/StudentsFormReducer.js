import {
  STUDENT_CREATE,
  CREATE_FAIL,
  LOADING,
  MODAL,
  STUDENTS_FETCH_SUCCESS,
  FORM_CHANGED,
  CONTRIBUTORS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  s_email: '',
  s_password: '',
  name: '',
  phone: '',
  days: 2,
  s_error: '',
  s_loading: false,
  modal: false,
  users: {},
  contributors: {},
  plan: 'Mensal',
  family_plan: 'no',
  parcel: false,
  parcel_number: 2,
  bills: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STUDENT_CREATE:
      return {
        ...state,
        s_email: '',
        s_password: '',
        name: '',
        phone: '',
        s_error: '',
        s_loading: false,
        modal: true,
        days: 2,
        plan: 'Mensal',
        family_plan: 'no',
        parcel: false,
        parcel_number: 2
      };
    case STUDENTS_FETCH_SUCCESS:
      return { ...state, users: action.payload };
    case CONTRIBUTORS_FETCH_SUCCESS:
      return { ...state, contributors: action.payload };

    case FORM_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };

    case CREATE_FAIL:
      return { ...state, s_error: 'Falha ao cadastrar.', s_password: '', s_loading: false };
    case LOADING:
      return { ...state, s_loading: true, error: '' };

    case MODAL:
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};
