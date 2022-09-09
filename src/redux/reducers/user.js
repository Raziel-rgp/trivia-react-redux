import { LOG_IN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN: return {
    ...state,
    gravatarEmail: action.gravatarEmail,
    name: action.name,
  };
  default: return state;
  }
};

export default user;
