export const LOG_IN = 'LOG_IN';
export const REQUEST_SCORE = 'REQUEST_SCORE';

const requestLogin = (email, name) => ({
  type: LOG_IN,
  gravatarEmail: email,
  name,
});

export const requestScore = (payload) => ({
  type: REQUEST_SCORE,
  payload,
});

export default requestLogin;
