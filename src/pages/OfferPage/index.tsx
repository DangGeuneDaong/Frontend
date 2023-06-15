import * as S from './styles';

import { useEffect, useState } from 'react';

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
  // const [showImages, setShowImages] = useState([])
  const [showPosts, setShowPosts] = useState([])
  const [showChatRoom, setShowChatRoom] = useState(false); // 클릭할 때, 채팅창 보여주거나 가리는 state 기능
  const [showTakerlists, setShowTakerlists] = useState([])
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'

    fetch(`${SERVER_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setShowPosts(data))

    // fetch(`${SERVER_URL}/image`)
    //   .then((response) => response.json())
    //   .then((data) => setShowImages(data))

    fetch(`${SERVER_URL}/takerlist`)
      .then((response) => response.json())
      .then((data) => setShowTakerlists(data))
  }, [])


  const showChange = () => {
    setShowChatRoom(!showChatRoom)
  }

  console.log('showTakerlists : ', showTakerlists);
  return (
    <MainTemplate>
      <S.Container>
        <S.OfferContainer>
          {/* {showImages.map(({ image }) => ())} */}
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
            <TakerListArea
              key={id}
              nickname={nickname}
              distance={distance}
              content={content}
              setProps={showChange}
            >{!showChatRoom ? '채팅하기' : '숨기기'}</TakerListArea>
          ))}

          <Pagination
            total={showTakerlists.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </S.OfferContainer>
        {showChatRoom && <ChatRoomArea getBack={showChange} />}
      </S.Container>
    </MainTemplate>
  );
};

export default OfferPage;
