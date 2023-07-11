import * as S from './styles';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import MainTemplate from '../../components/template/MainTemplate';
import TakerListArea from '../../components/TakerListArea';
import ChatRoomArea from '../../components/ChatRoomArea';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import Confirm from '../../components/Modal/Confirm';
import Chat from '../../components/Chat/Chat';
import { instance } from '../../apis/auth/api';

interface DataProps {
  sharingId: number;
  takerId: string;
  distance: number;
  roomId: number;
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

function OfferPage() {
  const param = useParams();
  // const param = 20;
  const postID = param.id as string;

  const [showPosts, setShowPosts] = useState<PostsProps>(); // 1개를 받아오기 때문에 배열 사용 X
  const [showTakerlists, setShowTakerlists] = useState([]); // 여러 개를 받아오기 때문에 배열 사용 O
  const [showRoomlists, setShowRoomlists] = useState([]); // 여러 개를 받아오기 때문에 배열 사용 O
  const [showRoomId, setShowRoomId] = useState(); // 여러 개를 받아오기 때문에 배열 사용 O
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null); // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
  const [isOpenSharingModal, setIsOpenSharingModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const LIMIT = 5;
  const offset = (page - 1) * LIMIT;
  const navigate = useNavigate();

  // const SERVER_URL = 'http://localhost:5000';

  const getData = async () => {
    try {
      // 1. Good의 n번째 id로 선택된 데이터 get 요청
      const { data } = await instance.get(`/good/offer/info?goodId=${postID}`);
      setShowPosts(data);

      // 2. Sharing_Application 데이터 get 요청
      const result_takerlists = await instance.get(
        `/sharing/application?goodId=${postID}`
      );
      // console.log('result_takerlists: ', result_takerlists);
      setShowTakerlists(result_takerlists.data);
    } catch (e) {
      console.log(e);
    }
  };

  const postChatData = async (sharingId: any, userId: any, offerId?: any) => {
    try {
      // 3. 채팅방 개설 및 입장
      const postData = {
        offerId: offerId,
        takerId: userId,
        sharingApplicationId: sharingId,
      };
      // console.log('postData: ', postData);
      const createChatData = await instance.post(`/chat/create`, postData);
      console.log('postChatData result : ', createChatData.data);
      // setShowRoomlists(result_roomlists.data);

      return createChatData.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getChatData = async (createChatData2: any) => {
    console.log('getChatData parameter: ', createChatData2);
    const enterChatData = await instance.get(
      `/chat/enter?roomId=${createChatData2.id}&takerId=${createChatData2.takerId}&offerId=${createChatData2.offerId}`
    );
    console.log('enterChatData result: ', enterChatData.data);
    // return enterChatData.data.roomId;
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectedUserData, setSelectedUserData] = useState<DataProps>({
    sharingId: -1,
    takerId: '',
    distance: -1,
    roomId: -1,
  });

  const showChange = async (
    sharingId: number,
    userId: string,
    distance: number,
    content?: string
  ) => {
    const 거리 = Math.floor(distance);
    const offerId = localStorage.getItem('userId');
    // console.log('sharingId: ', sharingId);
    // console.log('userId: ', userId);
    // console.log('distance: ', distance);

    // 만약 버튼을 클릭했을 때, 현재 유저와 같은 유저라면 채팅창 닫기(초기화)
    if (selectedButtonId === sharingId) {
      setSelectedButtonId(null);
      setIsOpenChat(false);
    } else {
      setSelectedButtonId(sharingId);
      setIsOpenChat(true);
    }

    const result = await postChatData(sharingId, userId, offerId);
    console.log('createChatData?????????????????: ', result);
    const roomId = await getChatData(result);
    // console.log('roomId2: ', roomId);
    // map으로 보낸 데이터 저장
    const data = {
      sharingId: sharingId,
      takerId: userId,
      distance: 거리,
      roomId: roomId as unknown as number,
    };
    // data 내 저장한 값을 외부에서 사용
    setSelectedUserData(data);
  };

  // 삭제하기 버튼을 클릭했을 때, 서버에 good table을 삭제하고, 메인 페이지로 이동
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const onClickGoodDataDeleteHandler = async () => {
    await instance.delete(`/good/offer/info?goodId=${postID}`);
    navigate(`/`); // main Page로 이동
  };

  // 나눔완료 버튼을 클릭했을 때, 서버 status를 COMPLETE로 변경하고, 화면에 COMPELTE 렌더링
  const [isCompleteText, setIsCompleteText] = useState<string>('SHARING');
  const onClickStatusHandler = async (status: string) => {
    await instance.put(`/good/offer/status?goodId=${postID}`); // 구조 분해 할당
    setIsCompleteText(status);
  };

  return (
    <MainTemplate>
      <S.Container>
        <S.OfferContainer>
          {showPosts && (
            <>
              <ImageCarouselArea config={showPosts?.goodImageList} />
              <PostArea
                key={showPosts.goodId}
                nickname={showPosts.offerNickName}
                location={showPosts.location}
                status={isCompleteText}
                title={showPosts.title}
                firstCategory={showPosts.mainCategory}
                secondCategory={showPosts.subCategory}
                createdTime={showPosts.updatedAt}
                productDetails={showPosts.description}
              />
            </>
          )}

          <S.EditContainer>
            <Button onClickHandler={() => setIsOpenDeleteModal(true)}>
              삭제하기
            </Button>
            {isOpenDeleteModal && (
              <Confirm
                title={'정말로 삭제하시겠습니까?'}
                message={'확인 버튼을 누르실 경우 해당 게시글이 삭제됩니다.'}
                onConfirm={() => {
                  onClickGoodDataDeleteHandler();
                  setIsOpenDeleteModal(false);
                }}
                onCancel={() => setIsOpenDeleteModal(false)}
              />
            )}
            <Button
              onClickHandler={() => {
                navigate(`/edit/${postID}`);
              }}
            >
              수정하기
            </Button>
            <Button
              onClickHandler={() => setIsOpenSharingModal(true)}
              styleType={isCompleteText === 'COMPLETE' ? 'disabled' : 'primary'}
            >
              나눔완료
            </Button>
            {isOpenSharingModal && (
              <Confirm
                title={'나눔완료로 변경하시겠습니까?'}
                message={
                  '확인 버튼을 누르실 경우 나눔 중에서 나눔 완료로 변경되어 새로운 신청자를 받을 수 없습니다.'
                }
                onConfirm={() => {
                  onClickStatusHandler('COMPLETE');
                  setIsOpenSharingModal(false);
                }}
                onCancel={() => setIsOpenSharingModal(false)} // 재사용성을 위해
              />
            )}
          </S.EditContainer>
          <S.ListTitleContainer>Taker 목록</S.ListTitleContainer>
          {showTakerlists
            .slice(offset, offset + LIMIT)
            .map(({ sharingId, userId, distance, content }) => (
              <>
                <TakerListArea
                  key={sharingId}
                  nickname={userId}
                  distance={Math.floor(distance)}
                  content={content}
                  setProps={() => {
                    showChange(sharingId, userId, distance, content);
                  }}
                >
                  {selectedButtonId === sharingId ? '숨기기' : '채팅하기'}
                </TakerListArea>
              </>
            ))}

          <Pagination
            total={showTakerlists.length}
            limit={LIMIT}
            page={page}
            setPage={setPage}
          />
        </S.OfferContainer>

        {isOpenChat && (
          <ChatRoomArea
            onHide={() => {
              setIsOpenChat(false);
              setSelectedButtonId(null);
            }}
            takerId={selectedUserData.takerId}
            distance={selectedUserData.distance}
            roomId={selectedUserData.roomId}
            sharingId={selectedUserData.sharingId}
          >
            {/* <Chat
              roomId={selectedUserData.roomId}
              userId={selectedUserData.userId}
            /> */}
          </ChatRoomArea>
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default OfferPage;
