import { AxiosInstance } from 'axios';

import { instance } from '../auth/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostModel, postState, postStateLoading } from '../../states/goodState';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { ItemType } from '../../components/KakaoMapContainer/itemType';

// 이미지 업로드
export const uploadImage = async (selectedFiles: File[]) => {
  const formData = new FormData();

  // 업로드 한 이미지가 없다면 빈 배열을 return
  if (selectedFiles.length === 0) return [];

  try {
    console.log('파일 업로드 시작');

    //selectedItem의 각 아이템을 formData로 가공
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`image${i}`, selectedFiles[i]);
    }

    // S3에서 각각의 이미지에 대해 String 값으로 return
    const response = await instance.post(
      'http://13.209.220.63/img/upload',
      formData
    );

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 개별글 조회
export const fetchPost = async (postId: string) => {
  try {
    console.log('개별글 조회 시작');

    const post = await instance.get(`/good/offer/info?goodId=${postId}`);

    return post.data;
  } catch (error: any) {
    console.log('에러 발생', error);
    return error;
  }
};

// 개별글 조회 데이터 패치 커스텀 훅
export const useFetchPost = (postId: string) => {
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
  const formData = new FormData();

  try {
    const requestObject = {
      userId: data.userId,
      mainCategory: data.mainCategory,
      subCategory: data.subCategory,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    const requestBlob = new Blob([JSON.stringify(requestObject)], {
      type: 'application/json',
    });

    formData.append('request', requestBlob);

    data.files.forEach((file: any) => {
      formData.append('files', file);
    });

    const response = await instance.post(
      'http://13.209.220.63/good/offer/info',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  } catch (error: any) {
    console.log('에러 발생', error);
  }
};

// 글 수정
export const editPost = async (data: any) => {
  const formData = new FormData();

  try {
    const requestObject = {
      goodId: data.goodId,
      mainCategory: data.mainCategory,
      subCategory: data.subCategory,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    const requestBlob = new Blob([JSON.stringify(requestObject)], {
      type: 'application/json',
    });

    formData.append('request', requestBlob);

    data.files.forEach((file: any) => {
      formData.append('files', file);
    });

    const response = await instance.put(
      'http://13.209.220.63/good/offer/info',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  } catch (error: any) {
    console.log('에러 발생', error);
  }
};

interface GetPostModel {
  responseLists: ItemType[];
  totalPage: number;
}

export const getPosts = async (requestURL: string) => {
  try {
    const response = await instance.get(`http://13.209.220.63${requestURL}`);
    if (response.data === null) throw new Error('데이터가 존재하지 않습니다.');
    const responseData: GetPostModel = response.data;
    return responseData.responseLists;
  } catch (error) {
    console.log('getPosts error : ', error);
  }
};

export const checkPostOwner = async (goodId: number, userId: number) => {
  try {
    const response = await instance.get(
      `http://13.209.220.63/good/match?userId=${userId}&goodId=${goodId}`
    );
    return response.data;
  } catch (error) {
    console.log('checkPostOwner error : ', error);
  }
};
