import * as S from './styles';

import { useEffect, useState } from 'react';
import { getPost, addPost } from '../../../src/api/api'

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';

const config = [
  {
    image: 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  }
]

const DetailPage = () => {
  const [comment, setComment] = useState<string>('');

  const getPosts = async () => {
    const response = await getPost()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <MainTemplate>
      <S.TakerContainer>
        <ImageCarouselArea config={config} />
        <PostArea
          nickname={'춤추는 무지'}
          location={'대구 달서구 대곡동'}
          productName={'웰시코기 유기농 사료'}
          firstCategory={'강아지'}
          secondCategory={'사료'}
          createdTime={'1달 전'}
          productDetails={'안녕하세요! 웰시코기 유기농 사료 나눔합니다!'}
        />
        <CommentArea setProps={(comment) => setComment(comment)} />
      </S.TakerContainer>
    </MainTemplate>
  );
};

export default DetailPage;
