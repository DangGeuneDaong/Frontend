import axios from 'axios';
import { JoinPageProps } from '../../pages/JoinPage';
import { LoginPageProps } from '../../pages/LoginPage';

const REFRESH_URL = 'http://3.36.236.207:8080/token';

export const instance = axios.create({
  baseURL: 'http://3.36.236.207:8080',
  headers: { 'Content-Type': 'application/json' },
  //쿠키를 받기 위해서는 cretentials 옵션 필요함
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const getAccessToken = async (): Promise<string | void> => {
  try {
    const {
      data: { accessToken },
    } = await axios.get<{ accessToken: string }>(REFRESH_URL);
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (e) {
    localStorage.removeItem('accessToken');
    window.location.href = '/signin';
  }
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    //요청을 반복해서 무한루프에 빠지는 걸 방지
    if (config.url === REFRESH_URL || config._retry) {
      return Promise.reject(error);
    }

    //401에러를 응답받을 경우
    if (status === 401) {
      config._retry = true;
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return instance(config);
    }
    return Promise.reject(error);
  }
);
//로그인 요청
export function loginRequest(data: LoginPageProps) {
  return axios.post('/user/signin', data);
}
//회원가입 요청
export function registerRequest(data: JoinPageProps) {
  return axios.post('/user/signup', data);
}
//로그아웃 요청
export function logoutRequest() {
  return axios.post('/user/logout');
}
//유저정보 요청
export function userProfileRequest() {
  return instance.get('/user');
}
