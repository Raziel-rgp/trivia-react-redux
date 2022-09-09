export const LOG_IN = 'LOG_IN';

const requestLogin = (email, name) => ({
  type: LOG_IN,
  gravatarEmail: email,
  name,
});

export default requestLogin;
