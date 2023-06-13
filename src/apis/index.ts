import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:3000';

// 기준 URL에 따라 axios 인스턴스를 생성하는 함수
export const axiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return instance;
};

export default axiosInstance;
