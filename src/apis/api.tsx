import axios from 'axios';
import { LoginPageProps } from '../pages/LoginPage';
import { accessTokenState } from '../states/authState';

export function loginRequest(data: LoginPageProps) {
  return axios.post('http://localhost:3000/login', data, {
    withCredentials: true,
  });
}

export function silentRefreshRequest() {
  return axios.post(
    'http://localhost:3000/silent-refresh',
    {},
    {
      headers: { Authorization: `Bearer ${accessTokenState}` },
      withCredentials: true,
    }
  );
}
