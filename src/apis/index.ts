import axios, { AxiosInstance } from 'axios';

// 기준 URL에 따라 axios 인스턴스를 생성하는 함수
export const createAxiosInstance = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return instance;
};

export default createAxiosInstance;
