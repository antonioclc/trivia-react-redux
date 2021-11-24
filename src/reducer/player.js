import { SET_USER_DATA } from "../actions";

const INITIAL_STATE = {
  name: '',
  email: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      }
    default: return state;
  }
}
