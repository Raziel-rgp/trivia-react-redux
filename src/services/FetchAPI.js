const URL = 'https://opentdb.com/api_token.php?command=request';
const URL_ASK = 'https://opentdb.com/api.php?amount=5&token=';

const requestAPI = async () => {
  const response = await fetch(URL);
  const object = await response.json();
  return object.token;
};

export const requestAskAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${URL_ASK}${token}`);
  const object = await response.json();
  return object.results;
};

export default requestAPI;
