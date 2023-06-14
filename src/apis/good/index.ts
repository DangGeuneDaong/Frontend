import { AxiosInstance } from 'axios';
import axiosInstance from '..';

// 이미지 업로드
export const uploadImage = async (selecteeFiles: File[]) => {
  const instance: AxiosInstance = axiosInstance();
  const formData = new FormData();

  // 업로드 한 이미지가 없다면 빈 배열을 return
  if (selecteeFiles.length === 0) return [];

  try {
    console.log('파일 업로드 시작');

    //selectedItem의 각 아이템을 formData로 가공
    for (let i = 0; i < selecteeFiles.length; i++) {
      formData.append(`image${i}`, selecteeFiles[i]);
    }

    // S3에서 각각의 이미지에 대해 String 값으로 return
    // const response = await instance.post('/api/img/upload', formData);
    const response = await instance.post(
      'http://localhost:3001/image',
      formData
    );

    // return response;
    return ['https://image.com/1', 'https://image.com/2'];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 글 등록
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
  }
};
