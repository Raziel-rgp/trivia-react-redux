import { REQUEST_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SCORE: return {
    ...state,
    score: state.score + action.payload,
  };
  default: return state;
  }
};

export default player;
