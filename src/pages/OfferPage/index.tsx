import * as S from './styles';

import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import MainTemplate from '../../components/template/MainTemplate';
import TakerListArea from '../../components/TakerListArea';
import ChatRoomArea from '../../components/ChatRoomArea';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import axiosInstance from '../../apis';
import Confirm from '../../components/Modal/Confirm';
import Chat from '../../components/Chat/Chat';

// const config = [
//   {
//     image:
//       'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
//   },
//   {
//     image:
//       'https://images.unsplash.com/photo-1597843786186-826cc3489f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
//   },
//   {
//     image:
//       'https://images.unsplash.com/photo-1616668983570-a971956d8928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
//   },
// ];

interface DataProps {
  id?: number;
  nickname?: string;
  distance?: string;
}

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

function OfferPage() {
  const param = useParams();

  const [showPosts, setShowPosts] = useState<PostsProps>(); // 1개를 받아오기 때문에 배열 사용 X
  const [showTakerlists, setShowTakerlists] = useState([]); // 여러 개를 받아오기 때문에 배열 사용 O
  const [showRoomlists, setShowRoomlists] = useState([]); // 여러 개를 받아오기 때문에 배열 사용 O
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null); // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
  const [isOpenSharingModal, setIsOpenSharingModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const LIMIT = 5;
  const offset = (page - 1) * LIMIT;
  const navigate = useNavigate();

  const SERVER_URL = 'http://13.209.220.63';
  // const SERVER_URL = 'http://localhost:5000';

  const fetchData = async () => {
    const instance: AxiosInstance = axiosInstance();
    // 1. Good의 n번째 id로 선택된 데이터 get 요청
    const { data } = await instance.get(`${SERVER_URL}/Good/1`);
    setShowPosts(data);

    // 2. Sharing_Application 데이터 get 요청
    const result_takerlists = await instance.get(
      `${SERVER_URL}/Sharing_Application`
    );
    setShowTakerlists(result_takerlists.data);

    // 3. 채팅방 개설 및 입장
    await instance.post(`${SERVER_URL}/chat/create`);
    const result_roomlists = await instance.get(`${SERVER_URL}/chat/enter`);
    setShowRoomlists(result_roomlists.data);
  };

  const [selectedUserData, setSelectedUserData] = useState<DataProps>({
    id: -1,
    nickname: '',
    distance: '',
  });

  const showChange = (id: number, nickname?: string, distance?: string) => {
    // 만약 버튼을 클릭했을 때, 현재 유저와 같은 유저라면 채팅창 닫기(초기화)
    if (selectedButtonId === id) {
      setSelectedButtonId(null);
      setIsOpenChat(false);
    } else {
      setSelectedButtonId(id);
      setIsOpenChat(true);
    }

    // map으로 보낸 데이터 저장
    const data = {
      id: id,
      nickname: nickname,
      distance: distance,
    };
    // data 내 저장한 값을 외부에서 사용
    setSelectedUserData(data);
  };

  const onClickSharingConfirmModalHandler = () => {
    // 없던 모달창이 생김
    {
      !isOpenSharingModal && setIsOpenSharingModal(true);
    }
  };
  const onClickSharingCancelModalHandler = () => {
    // 있던 모달창이 사라짐
    {
      isOpenSharingModal && setIsOpenSharingModal(false);
    }
  };

  const onClickStatusHandler = async () => {
    const instance: AxiosInstance = axiosInstance();
    const { data } = await instance.patch(`${SERVER_URL}/Good/1`, {
      status: '나눔 완료',
    }); // 구조 분해 할당
    if (showPosts) {
      showPosts.status = '나눔 완료';
      setShowPosts({ ...showPosts });
    }

    // 있던 모달창이 사라짐
    {
      isOpenSharingModal && setIsOpenSharingModal(false);
    }
  };

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const onClickDeleteConfirmModalHandler = () => {
    {
      !isOpenDeleteModal && setIsOpenDeleteModal(true);
    }
  };
  const onClickDeleteCancelModalHandler = () => {
    {
      isOpenDeleteModal && setIsOpenDeleteModal(false);
    }
  };
  const onClickGoodDataDeleteHandler = async () => {
    const instance: AxiosInstance = axiosInstance();
    await instance.delete(`${SERVER_URL}/Good/2`);
    navigate(`/`); // main Page로 이동

    // 있던 모달창이 사라짐
    {
      isOpenDeleteModal && setIsOpenDeleteModal(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainTemplate>
      <S.Container>
        <S.OfferContainer>
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

          {/* <EditArea /> */}
          <S.EditContainer>
            <Button onClickHandler={onClickDeleteConfirmModalHandler}>
              삭제하기
            </Button>
            {isOpenDeleteModal && (
              <Confirm
                title={'정말로 삭제하시겠습니까?'}
                message={'확인 버튼을 누르실 경우 해당 게시글이 삭제됩니다.'}
                onConfirm={onClickGoodDataDeleteHandler}
                onCancel={onClickDeleteCancelModalHandler}
              />
            )}
            <Button
              onClickHandler={() => {
                navigate(`/edit/${param}`);
              }}
            >
              수정하기
            </Button>
            <Button
              onClickHandler={onClickSharingConfirmModalHandler}
              styleType={
                showPosts?.status === '나눔 완료' ? 'disabled' : 'primary'
              }
            >
              나눔완료
            </Button>
            {isOpenSharingModal && (
              <Confirm
                title={'나눔완료로 변경하시겠습니까?'}
                message={
                  '확인 버튼을 누르실 경우 나눔 중에서 나눔 완료로 변경되어 새로운 신청자를 받을 수 없습니다.'
                }
                onConfirm={onClickStatusHandler}
                onCancel={onClickSharingCancelModalHandler} // 재사용성을 위해
              />
            )}
          </S.EditContainer>
          <S.ListTitleContainer>Taker 목록</S.ListTitleContainer>
          {showTakerlists
            .slice(offset, offset + LIMIT)
            .map(({ id, nickname, distance, content }) => (
              <>
                <TakerListArea
                  key={id}
                  nickname={nickname}
                  distance={distance}
                  content={content}
                  setProps={() => showChange(id, nickname, distance)}
                >
                  {selectedButtonId === id ? '숨기기' : '채팅하기'}
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

        {isOpenChat &&
          showRoomlists === roomId && ( // roomId에 따라 선택된 ChatRoomArea를 보여주기
            <ChatRoomArea
              onClose={() => {
                setIsOpenChat(false);
                setSelectedButtonId(null);
              }}
              nickname={selectedUserData.nickname}
              distance={selectedUserData.distance}
            />
          )}
        {isOpenChat &&
          showRoomlists.map(({ i, roomId, userId: { takerId, offerId } }) => (
            <ChatRoomArea
              onClose={() => {
                setIsOpenChat(false);
                setSelectedButtonId(null);
              }}
              nickname={selectedUserData.nickname}
              distance={selectedUserData.distance}
            >
              <Chat
                key={i}
                roomId={roomId}
                takerId={takerId}
                offerId={offerId}
              />
            </ChatRoomArea>
          ))}
      </S.Container>
    </MainTemplate>
  );
}

export default OfferPage;
