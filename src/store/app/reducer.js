import * as APP from '../app/action-type';

const INITIAL_STATE = {
  token: '',
  user: {}
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP.LOGIN:
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    case APP.REGISTER_USER: 
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    case APP.GET_USER_INFO:
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    default:
      return state;
  }
}
