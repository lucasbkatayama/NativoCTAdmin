import {
  EXERCISE_FORM_CHANGED,
  CLASSES_FETCH_SUCCESS,
  RESET_CLASS
} from '../actions/types';

const INITIAL_STATE = {
  morningInitialHour: '',
  morningFinalHour: '',
  eveningInitialHour: '',
  eveningFinalHour: '',
  dateModal: false,
  timeModal: false,
  date: '',
  updateKey: 0,
  classes: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISE_FORM_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CLASSES_FETCH_SUCCESS:
      return { ...state, classes: action.payload };
    case RESET_CLASS:
      return {
        ...state,
        morningInitialHour: '',
        morningFinalHour: '',
        eveningInitialHour: '',
        eveningFinalHour: '',
        dateModal: false,
        timeModal: false,
        date: '',
        updateKey: '',
      };
    default:
      return state;
  }
};
