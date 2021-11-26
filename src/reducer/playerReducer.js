import { SET_USER_DATA, SAVE_TOKEN_DATA, SAVE_QUESTIONS_DATA,
  UPDATE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: {},
  questions: {},
  points: 0,
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SAVE_TOKEN_DATA:
    return {
      ...state,
      token: action.payload,
    };
  case SAVE_QUESTIONS_DATA:
    return {
      ...state,
      questions: action.payload,
    };
  case UPDATE_POINTS:
    return {
      ...state,
      points: action.payload,
    };
  default: return state;
  }
}
