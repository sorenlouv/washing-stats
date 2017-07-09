import axios from 'axios';

export function getData() {
  return axios.get(
    'https://37d088qpv9.execute-api.eu-west-1.amazonaws.com/prod/'
  );
}
