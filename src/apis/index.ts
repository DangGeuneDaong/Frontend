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

  // 인터셉터 설정

  // API 응답 데이터 가공 및 에러 핸들링
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
          case 404:
            throw new Error('API 요청에 실패했습니다.');
          case 401:
            // TODO : 비 로그인 유저일 때, 확인 알럿 띄우고 로그인 페이지로 이동
            throw new Error('로그인이 필요합니다.');
          case 500:
            throw new Error('서버에 오류가 발생했습니다.');
          default:
            throw new Error('알 수 없는 에러가 발생했습니다.');
        }
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  );
  return instance;
};

export default axiosInstance;
