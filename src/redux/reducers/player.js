import { LOG_IN, REQUEST_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default: return state;
  }
};

export default player;
