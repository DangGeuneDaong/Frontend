import * as S from './styles';

import { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useParams } from 'react-router-dom';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';
import { instance } from '../../apis/auth/api';
import ChatRoomArea from '../../components/ChatRoomArea';

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
  const postID = param.id as string;

  const [showPosts, setShowPosts] = useState<PostsProps>();
  const [changeButton, setChangeButton] = useState(true);
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null); // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  useEffect(() => {
    // const SERVER_URL = 'http://13.209.220.63';
    // const SERVER_URL = 'http://localhost:5000';
    const fetchData = async () => {
      const { data } = await instance.get(`good/taker/info?goodId=${postID}`);
      console.log('data: ', data);
      setShowPosts(data);
    };
    fetchData();
  }, []);

  return (
    <MainTemplate>
      <S.Container>
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
          <CommentArea
            changeButton={changeButton}
            setChangeButton={setChangeButton}
          />
        </S.TakerContainer>
        {changeButton && (
          // checkChatStatus?.takerId === userId &&
          // checkChatStatus?.isOpened && (
          // roomId={checkChatStatus?.roomId}
          <ChatRoomArea
            onHide={() => {
              setIsOpenChat(false);
              setSelectedButtonId(null);
            }}
            takerId={'test1234'}
            distance={String(10007.541864499188)}
            roomId={1}
            sharingId={1}
          >
            {/* <Chat roomId={checkRoomId} userId={String(userId)} /> */}
          </ChatRoomArea>
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default TakerPage;
