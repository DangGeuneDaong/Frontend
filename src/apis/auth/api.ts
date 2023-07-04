import axios from 'axios';
import { JoinPageProps } from '../../pages/JoinPage';
import { LoginPageProps } from '../../pages/LoginPage';
import { AddInfoProps } from '../../pages/RedirectPage/AddInfoPage';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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
    const response = await instance.post(`/user/token`);
    localStorage.setItem('accessToken', response.data.substr(1));

    return response.data.substr(1);
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
    if (config.url === '/user/token' || config._retry) {
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
  return instance.post('/user/signin', data);
}
//회원가입 요청
export function registerRequest(data: JoinPageProps) {
  return instance.post('/user/signup', data);
}
//로그아웃 요청
export function logoutRequest() {
  return instance.post('/user/logout');
}
//유저정보 요청 (userId)
export function userProfileRequest(userId: string) {
  return instance.get(`/user/info?userId=${userId}`);
}
//유저정보 요청 (accessToken)
export function socialUserProfileRequest(accessToken: string) {
  return instance.get(`/user/payload?accessToken=${accessToken}`);
}

//추가정보 입력
export function addInfoRequest(data: AddInfoProps, profileUrl: string) {
  return instance.post('/user/update', { ...data, profile_url: profileUrl });
}
