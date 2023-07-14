import * as S from './styles';

import { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';
import { instance } from '../../apis/auth/api';
import ChatRoomArea from '../../components/ChatRoomArea';
import Chat from '../../components/Chat/Chat';
import Textarea from '../../components/Form/Textarea';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import OfferPage from '../OfferPage';
interface DataProps {
  sharingId?: number;
  takerId?: string;
  distance?: number;
  roomId?: number;
  offerId?: string;
}

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

// { sharingId, distance, roomId, offerId }: DataProps

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

  // textarea 데이터를 '신청하기'버튼 클릭 시 submit
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 실시간 값 감시 가능
  } = useForm();

  // theme 속 styled-components를 사용하기 위해 useTheme 선언
  const theme = useTheme();

  // const SERVER_URL = 'http://localhost:5000';
  const takerId = localStorage.getItem('userId');
  const postData = async (content: any) => {
    // 서버에 content 데이터 post하기
    try {
      const data = {
        userId: takerId,
        goodId: postID,
        content: content.postComment,
      };

      await instance.post(`/sharing/application`, data);

      // chat/create로 takerId post하기
      // await instance.post(`/chat/create`, takerId);
    } catch (e) {
      console.log(e);
    }

    // Button 변경하기
    setChangeButton(true);
  };

  const deleteData = async () => {
    // 서버에 sharingApplication Delete하기
    try {
      await instance.delete(
        `/sharing/application?sharingApplicationId=${postID}` // 차후, sharing/application?sharingApplicationId=1로 변경
      );
    } catch (e) {
      console.log(e);
    }

    // Button 변경하기
    setChangeButton(false);
  };

  // OfferPage에서 갖고 온 데이터들
  const [selectedUserData, setSelectedUserData] = useState<DataProps>({
    sharingId: -1,
    takerId: '',
    distance: -1,
    roomId: -1,
    offerId: '',
  });
  const showChange = (data: {
    sharingId: number;
    takerId: string;
    distance: number;
    roomId: number;
    offerId: string;
  }) => {
    setSelectedUserData(data);
  };

  // const data = {
  //   sharingId: sharingId,
  //   takerId: takerId!,
  //   distance: distance,
  //   roomId: roomId, // 너는 어디서 값을 가져올까?
  //   offerId: offerId, // 너는 어디서 값을 가져올까?
  // };
  // data 내 저장한 값을 외부에서 사용
  // console.log('data on TakerPage: ', data);
  // setSelectedUserData(data);

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
          {/* <CommentArea
            changeButton={changeButton}
            setChangeButton={setChangeButton}
          /> */}
          <S.FormContainer>
            {!changeButton && (
              <S.Form onSubmit={handleSubmit(postData)}>
                <Textarea
                  placeholder={'궁금한 사항을 적어주세요!'}
                  errors={errors}
                  containerType="content"
                  {...register('postComment')}
                  width={'590px'}
                  style={{
                    height: '90px',
                  }}
                />
                <Button
                  width={'90px'}
                  height={'90px'}
                  borderRadius={'10px'}
                  // onClickHandler={postCommentInfo}
                  style={{
                    lineHeight: '90px',
                  }}
                >
                  신청하기
                </Button>
              </S.Form>
            )}
            {changeButton && (
              <S.Form onSubmit={handleSubmit(deleteData)}>
                <Button
                  height={'90px'}
                  borderRadius={'10px'}
                  style={{
                    backgroundColor: 'white',
                    borderColor: `${theme.color.red}`,
                    fontSize: '30px',
                  }}
                >
                  신청취소
                </Button>
              </S.Form>
            )}
          </S.FormContainer>
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
            takerId={'selectedUserData.takerId'}
            distance={13}
          >
            <Chat
              roomId={selectedUserData.roomId}
              takerId={'selectedUserData.takerId'}
              offerId={'selectedUserData.offerId'}
            />
          </ChatRoomArea>
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default TakerPage;
