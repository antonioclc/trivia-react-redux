import { SAVE_QUESTIONS_DATA } from '../actions';

const INITIAL_STATE = {
  questions: {},
};

export default function questionsReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS_DATA:
    return {
      ...state,
      questions: action.payload,
    };
  default: return state;
  }
}
