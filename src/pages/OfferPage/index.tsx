import * as S from './styles';

import { useEffect, useState } from 'react';
import axios from 'axios'

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import MainTemplate from '../../components/template/MainTemplate';
// import CommentArea from '../../components/CommentArea';
import TakerListArea from '../../components/TakerListArea';
import ChatRoomArea from '../../components/ChatRoomArea';
import EditArea from '../../components/EditArea';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';

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
  nickname?: string,
  distance?: string
}

function OfferPage() {
  const [showImages, setShowImages] = useState([])
  const [showPosts, setShowPosts] = useState([])
  const [showTakerlists, setShowTakerlists] = useState([])
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isChat, setIsChat] = useState<number>(-1) // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  // const [isOpenChat, setIsOpenChat] = useState(false)
  const [isSharing, setIsSharing] = useState<string>('') // 나눔완료 클릭 시, 나눔 중에서 완료로 변경


  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'
    const fetchData = async () => {
      const { data } = await axios.get(`${SERVER_URL}/Good`)
      setShowPosts(data)
      // const result_images = await axios.get(`${SERVER_URL}/images`)
      // setShowImages(result_images.data)
      const result_takerlists = await axios.get(`${SERVER_URL}/Sharing_Application`)
      setShowTakerlists(result_takerlists.data)
    }
    fetchData()
  }, [])

  const [selectedUserData, setSelectedUserData] = useState<DataProps>({ id: -1, nickname: '', distance: '' })

  const showChange = (id: number, nickname?: string, distance?: string) => {
    if (isChat === -1) {
      setIsChat(id)
    } else {
      setIsChat(-1)
    }

    // map으로 보낸 데이터 저장
    const data = {
      id: id,
      nickname: nickname,
      distance: distance
    }
    // data 내 저장한 값을 외부에서 사용
    setSelectedUserData(data)
  }

  const changeSharing = (status: string) => {
    if (status === "나눔 중") {

    }
  }

  return (
    <MainTemplate>
      <S.Container>
        <S.OfferContainer>
          {/* {showImages.map(({ images }) => ())} */}
          <ImageCarouselArea config={config} />

          {showPosts.map(({ id, main_category, sub_category, title, description, status, good_image_list, created_at, user_id }) => (
            <>
              <PostArea
                key={id}
                nickname={user_id["nickname"]}
                location={user_id["location"]}
                status={status}
                title={title}
                firstCategory={main_category}
                secondCategory={sub_category}
                createdTime={created_at}
                productDetails={description}
              />
            </>
          ))}
          {/* <EditArea /> */}
          <S.EditContainer>
            <Button>삭제하기</Button>
            <Button>수정하기</Button>
            <Button>나눔완료</Button>
          </S.EditContainer>
          <S.ListTitleContainer>Taker 목록</S.ListTitleContainer>
          {showTakerlists.slice(offset, offset + limit).map(({ id, nickname, distance, content }) => (
            <>
              <TakerListArea
                key={id}
                nickname={nickname}
                distance={distance}
                content={content}
                setProps={() => showChange(id, nickname, distance)}
              >{isChat === id ? '숨기기' : '채팅하기'}</TakerListArea>
            </>
          ))}

          <Pagination
            total={showTakerlists.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </S.OfferContainer>


        {/* {showTakerlists.map(({ id, nickname, distance }) => ())} */}
        {isChat !== -1 && <ChatRoomArea nickname={selectedUserData.nickname} distance={selectedUserData.distance} />}
      </S.Container>
    </MainTemplate>
  );
};

export default OfferPage;
