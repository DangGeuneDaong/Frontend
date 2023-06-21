// import axios from 'axios';
// import { LoginPageProps } from '../../pages/LoginPage';
// import { accessTokenState } from '../../states/authState';
//추후 Instance 생성할 예정

// export function registerRequest(data: JoinPageProps) {
//   return axios.post('http://localhost:3000/register', data, {
//     withCredentials: true,
//   });
// }
// export function loginRequest(data: LoginPageProps) {
//   return axios.post('http://localhost:3000/login', data, {
//     withCredentials: true,
//   });
// }

// export function silentRefreshRequest() {
//   return axios.post(
//     'http://localhost:3000/silent-refresh',
//     {},
//     {
//       headers: { Authorization: `Bearer ${accessTokenState}` },
//       withCredentials: true,
//     }
//   );
// }

import axios from 'axios';
import { LoginPageProps } from '../../pages/LoginPage';
import { accessTokenState } from '../../states/authState';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (accessTokenState) {
    console.log(accessTokenState);
    config.headers.Authorization = `Bearer ${accessTokenState}`;
  }
  return config;
});

export function loginRequest(data: LoginPageProps) {
  return instance.post('/login', data);
}

export function silentRefreshRequest() {
  return instance.post('/silent-refresh');
}
