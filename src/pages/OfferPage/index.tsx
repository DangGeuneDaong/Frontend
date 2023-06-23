import * as S from './styles';

import { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import MainTemplate from '../../components/template/MainTemplate';
// import CommentArea from '../../components/CommentArea';
import TakerListArea from '../../components/TakerListArea';
import ChatRoomArea from '../../components/ChatRoomArea';
import EditArea from '../../components/EditArea';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import axiosInstance from '../../api';

const config = [
  {
    image:
      'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1597843786186-826cc3489f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1616668983570-a971956d8928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
  },
];

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
  const [showImages, setShowImages] = useState([]);
  const [showPosts, setShowPosts] = useState<PostsProps>(); // 1개를 받아오기 때문에 배열 사용 X
  const [showTakerlists, setShowTakerlists] = useState([]); // 여러 개를 받아오기 때문에 배열 사용 O

  const LIMIT = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null); // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isSharing, setIsSharing] = useState<string>(''); // 나눔완료 클릭 시, 나눔 중에서 완료로 변경

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000';
    const fetchData = async () => {
      const instance: AxiosInstance = axiosInstance();
      const { data } = await instance.get(`${SERVER_URL}/Good/1`);
      // for (const key in goodData) {
      //   console.log('key : ', key);
      // }
      setShowPosts(data);
      const result_takerlists = await instance.get(
        `${SERVER_URL}/Sharing_Application`
      );
      setShowTakerlists(result_takerlists.data);
    };
    fetchData();
  }, [showPosts]);

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

  const onClickStatusHandler = () => {
    const instance: AxiosInstance = axiosInstance();
    instance.patch('http://localhost:5000/Good/1', {
      status: '나눔 완료',
    });

    showPosts?.status === '나눔 완료' && 'disabled';
  };

  // useEffect(() => {}, [showPosts?.status]);

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
            <Button>삭제하기</Button>
            <Button>수정하기</Button>
            <Button
              onClickHandler={onClickStatusHandler}
              styleType={
                showPosts?.status === '나눔 완료' ? 'disabled' : 'primary'
              }
            >
              나눔완료
            </Button>
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
          />
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default OfferPage;
