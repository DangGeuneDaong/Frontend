import { AxiosInstance } from 'axios';
import axiosInstance from '..';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostModel, postState, postStateLoading } from '../../states/goodstate';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

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
      'http://localhost:5000/image',
      formData
    );

    // return response;
    return ['https://image.com/1', 'https://image.com/2'];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 개별글 조회
export const fetchPost = async (postId: string) => {
  try {
    console.log('개별글 조회 시작');
    const instance: AxiosInstance = axiosInstance();
    const post = await instance.get(`http://localhost:5000/good/${postId}`);

    return post.data;
  } catch (error: any) {
    console.log('에러 발생', error);
    return error;
  }
};

// 개별글 조회 데이터 패치 커스텀 훅
export const useFetchPost = (postId: string) => {
  // TODO : API 연동할 때 any 타입을 수정
  const [post, setPost] = useRecoilState<any>(postState);

  const [isPostLoading, setIsPostLoading] = useRecoilState(postStateLoading);

  // refecthOnWindowFocus: 창이 포커스 될 때 데이터를 다시 가져오지 않음
  const query = useQuery(['post', postId], () => fetchPost(postId), {
    refetchOnWindowFocus: false,
  });

  // 데이터를 조회해서 recoil atoms에 저장
  // useEffect로 query.data가 변경되거나 setPost가 실행될 때마다 실행
  useEffect(() => {
    if (query.data) {
      setPost(query.data);
    }
  }, [query.data, setPost]);

  useEffect(() => {
    setIsPostLoading(query.isLoading);
  }, [query.isLoading, setIsPostLoading]);

  return { post, isPostLoading };
};

// 글 등록
export const addPost = async (data: any) => {
  try {
    const instance: AxiosInstance = axiosInstance();
    // const response = await instance.post('/good/offer/info', data);
    const response = await instance.post('http://localhost:5000/good', data);

    // 성공 로직
    console.log('성공');

    return response;
  } catch (error: any) {
    console.log('에러 발생', error);
  }
};

// 글 수정
export const editPost = async (data: any) => {
  try {
    const instance: AxiosInstance = axiosInstance();
    const response = await instance.put('http://localhost:5000/good', data);

    return response;
  } catch (error: any) {
    console.log('에러 발생', error);
  }
};
