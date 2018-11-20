import { combineReducers } from 'redux';

import StudentsFormReducer from './StudentsFormReducer';
import ExerciseReducer from './ExerciseReducer';

export default combineReducers({
  student: StudentsFormReducer,
  exercise: ExerciseReducer,
});
