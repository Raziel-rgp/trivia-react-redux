import { LOG_IN, 
  REQUEST_SCORE, 
  REQUEST_ASSERTIONS,
  RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN: return {
    ...state,
    gravatarEmail: action.gravatarEmail,
    name: action.name,
  };
  case REQUEST_SCORE: return {
    ...state,
    score: state.score + action.payload,
  };
  case REQUEST_ASSERTIONS: return {
    ...state,
    assertions: state.assertions + 1,
  };
  case RESET_SCORE: return {
    INITIAL_STATE,
  };
  default: return state;
  }
};

export default player;
