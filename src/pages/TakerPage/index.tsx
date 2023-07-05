import * as S from './styles';

import { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useParams } from 'react-router-dom';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';
import { instance } from '../../apis/auth/api';

interface PostsProps {
  goodId: number;
  offerNickName: string;
  mainCategory: string;
  subCategory: string;
  title: string;
  description: string;
  location: string;
  status: string;
  goodImageList: string[];
  viewCnt: number;
  updatedAt: string;
  modifiedAt: string;
}

function TakerPage() {
  const param = useParams();
  // const param = '20';
  // console.log(`param: `, param);

  const [showPosts, setShowPosts] = useState<PostsProps>();

  useEffect(() => {
    const SERVER_URL = 'http://13.209.220.63';
    // const SERVER_URL = 'http://localhost:5000';
    const fetchData = async () => {
      const { data } = await instance.get(
        `${SERVER_URL}/good/taker/info?goodId=${param}`
      );
      setShowPosts(data);
    };
    fetchData();
  }, []);

  return (
    <MainTemplate>
      <S.TakerContainer>
        {showPosts && (
          <>
            <ImageCarouselArea config={showPosts?.goodImageList} />
            <PostArea
              key={showPosts.goodId}
              nickname={showPosts.offerNickName}
              firstCategory={showPosts.mainCategory}
              secondCategory={showPosts.subCategory}
              title={showPosts.title}
              productDetails={showPosts.description}
              location={showPosts.location}
              status={showPosts.status}
              createdTime={showPosts.updatedAt}
            />
          </>
        )}
        <CommentArea />
      </S.TakerContainer>
    </MainTemplate>
  );
}

export default TakerPage;
