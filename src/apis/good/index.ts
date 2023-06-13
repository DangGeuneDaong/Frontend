import { AxiosInstance } from 'axios';
import axiosInstance from '..';

// 폼 전송
export const addPost = async (data: any) => {
  try {
    const instance: AxiosInstance = axiosInstance();
    // const response = await instance.post('/good/offer/info', data);
    const response = await instance.post('http://localhost:3001/good', data);

    // 성공 로직
    console.log('성공');

    return response;
  } catch (error: any) {
    console.log('에러 발생', error);

    switch (error.response.status) {
      // 400 (Bad Request) 401 (Unauthorized) 404 (Not Found) 500 (Internal Server Error)
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
  }
};
