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

function OfferPage() {
  const [showImages, setShowImages] = useState([])
  const [showPosts, setShowPosts] = useState([])
  const [showTakerlists, setShowTakerlists] = useState([])
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isChat, setIsChat] = useState<number>(-1) // 클릭할 때, 채팅창 보여주거나 가리는 state 기능

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'
    const fetchData = async () => {
      const result_posts = await axios.get(`${SERVER_URL}/posts`)
      setShowPosts(result_posts.data)
      // const result_images = await axios.get(`${SERVER_URL}/images`)
      // setShowImages(result_images.data)
      const result_takerlists = await axios.get(`${SERVER_URL}/takerlists`)
      setShowTakerlists(result_takerlists.data)
    }
    fetchData()
  }, [])


  const showChange = (id: number) => {
    if (isChat === -1) {
      setIsChat(id)
    } else {
      setIsChat(-1)
    }
  }

  return (
    <MainTemplate>
      <S.Container>
        <S.OfferContainer>
          {/* {showImages.map(({ images }) => ())} */}
          <ImageCarouselArea config={config} />

          {showPosts.map(({ nickname, location, productName, firstCategory, secondCategory, createdTime, productDetails }) => (
            <PostArea
              nickname={nickname}
              location={location}
              productName={productName}
              firstCategory={firstCategory}
              secondCategory={secondCategory}
              createdTime={createdTime}
              productDetails={productDetails}
            />
          ))}
          <EditArea />
          <S.ListTitleContainer>Taker 목록</S.ListTitleContainer>
          {showTakerlists.slice(offset, offset + limit).map(({ id, nickname, distance, content }) => (
            <>
              <TakerListArea
                key={id}
                nickname={nickname}
                distance={distance}
                content={content}
                setProps={() => showChange(id)}
              >{isChat === id ? '숨기기' : '채팅하기'}</TakerListArea>
              {/* <S.ChatRoomContainer>
                {isChat === id && <ChatRoomArea getBack={() => showChange(id)} nickname={nickname} distance={distance} />}
              </S.ChatRoomContainer> */}
            </>
          ))}

          <Pagination
            total={showTakerlists.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </S.OfferContainer>

        {showTakerlists.map(({ id, nickname, distance }) => (
          <>
            {isChat === id && <ChatRoomArea getBack={() => showChange(id)} nickname={nickname} distance={distance} />}
          </>
        ))}
      </S.Container>
    </MainTemplate>
  );
};

export default OfferPage;
