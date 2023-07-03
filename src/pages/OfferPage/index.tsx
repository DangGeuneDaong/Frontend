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
import { instance } from '../../apis/auth/api';

interface DataProps {
  id?: number;
  nickname?: string;
  distance?: string;
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
  // const param = useParams();
  const param = 20;

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

  const SERVER_URL = 'http://13.209.220.63';
  // const SERVER_URL = 'http://localhost:5000';

  const fetchData = async () => {
    // 1. Good의 n번째 id로 선택된 데이터 get 요청
    const { data } = await instance.get(
      `${SERVER_URL}/good/offer/info?goodId=${param}`
    );
    setShowPosts(data);

    // 2. Sharing_Application 데이터 get 요청
    const result_takerlists = await instance.get(
      `${SERVER_URL}/sharing/application?goodId=${param}`
    );
    setShowTakerlists(result_takerlists.data);

    // 3. 채팅방 개설 및 입장
    await instance.post(`${SERVER_URL}/chat/create`);
    const result_roomlists = await instance.get(`${SERVER_URL}/chat/enter`);
    setShowRoomlists(result_roomlists.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    const { data } = await instance.patch(
      `${SERVER_URL}/good/offer/info?goodId=${param}`
    ); // 구조 분해 할당
    if (showPosts) {
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
    await instance.delete(`${SERVER_URL}/good/offer/info?goodId=${param}`);
    navigate(`/`); // main Page로 이동

    // 있던 모달창이 사라짐
    {
      isOpenDeleteModal && setIsOpenDeleteModal(false);
    }
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
                status={showPosts.status}
                title={showPosts.title}
                firstCategory={showPosts.mainCategory}
                secondCategory={showPosts.subCategory}
                createdTime={showPosts.updatedAt}
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

        {isOpenChat && (
          <ChatRoomArea
            onClose={() => {
              setIsOpenChat(false);
              setSelectedButtonId(null);
            }}
            nickname={selectedUserData.nickname}
            distance={selectedUserData.distance}
          >
            <Chat roomId={showRoomId} />
          </ChatRoomArea>
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default OfferPage;
