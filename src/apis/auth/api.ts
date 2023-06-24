import axios from 'axios';
import { LoginPageProps } from '../../pages/LoginPage';

const REFRESH_URL = 'http://localhost:3000/refresh-token';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  //withCredentials: true,
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

export function loginRequest(data: LoginPageProps) {
  return instance.post('/login', data);
}
