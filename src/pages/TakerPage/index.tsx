import * as S from './styles';

import { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';
import axiosInstance from '../../api';

interface PostsProps {
  id: number;
  main_category: string;
  sub_category: string;
  title: string;
  description: string;
  status: string;
  good_image_list: string[];
  view_cnt: number;
  created_at: string;
  modified_at: string;
  user_id: {
    nickname: string;
    location: string;
  };
}

function TakerPage() {
  const [showPosts, setShowPosts] = useState<PostsProps>();

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000';
    const fetchData = async () => {
      const instance: AxiosInstance = axiosInstance();
      const { data } = await instance.get(`${SERVER_URL}/Good/1`);
      setShowPosts(data);
    };
    fetchData();
  }, []);

  return (
    <MainTemplate>
      <S.TakerContainer>
        {showPosts && (
          <>
            <ImageCarouselArea config={showPosts?.good_image_list} />
            <PostArea
              key={showPosts.id}
              nickname={showPosts.user_id.nickname}
              location={showPosts.user_id.location}
              status={showPosts.status}
              title={showPosts.title}
              firstCategory={showPosts.main_category}
              secondCategory={showPosts.sub_category}
              createdTime={showPosts.created_at}
              productDetails={showPosts.description}
            />
          </>
        )}
        <CommentArea />
      </S.TakerContainer>
    </MainTemplate>
  );
}

export default TakerPage;
