import * as S from './styles';

import { useEffect, useState } from 'react';
import { getPost, addPost } from '../../../src/api/api'

import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate';

const config = [
  {
    image: 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    image:
      'https://images.unsplash.com/photo-1597843786186-826cc3489f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1616668983570-a971956d8928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
  }
]

const TakerPage = () => {
  const [showPosts, setShowPosts] = useState([])
  const [comment, setComment] = useState<string>(''); // 댓글 작성

  // const getPosts = async () => {
  //   const response = await getPost()
  // }

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'

    fetch(`${SERVER_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setShowPosts(data))

    // getPosts()
  }, [])

  return (
    <MainTemplate>
      <S.TakerContainer>
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

        <CommentArea setProps={(comment) => setComment(comment)} />
      </S.TakerContainer>
    </MainTemplate>
  );
};

export default TakerPage;
