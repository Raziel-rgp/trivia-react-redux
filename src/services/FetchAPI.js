const URL = 'https://opentdb.com/api_token.php?command=request';

const requestAPI = async () => {
  const response = await fetch(URL);
  const object = await response.json();
  console.log(object.token);
  return object.token;
};

export default requestAPI;
