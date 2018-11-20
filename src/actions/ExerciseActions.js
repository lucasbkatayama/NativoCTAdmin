import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EXERCISE_FORM_CHANGED,
  RESET_CLASS,
  CLASSES_FETCH_SUCCESS
} from './types';

export const exerciseFormChanged = ({ prop, value }) => {
  return {
    type: EXERCISE_FORM_CHANGED,
    payload: { prop, value }
  };
};

export const markClass = (date, hoursAvailable) => {
  const classDate = date.getTime();

  return (dispatch) => {
    firebase.database().ref(`/classes/${classDate}`)
      .set({
        hours: hoursAvailable
      }).then(() => {
        dispatch({ type: RESET_CLASS });
        Actions.pop();
      });
  };
};

export const classesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/classes')
    .on('value', snapshot => {
      dispatch({ type: CLASSES_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
