import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReduce from './questionsReduce';

const rootReducer = combineReducers({ playerReducer, questionsReduce });

export default rootReducer;
