import * as S from './styles';

import { useEffect, useState } from 'react';
import axios from 'axios'

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


  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'
    const fetchData = async () => {
      const result_posts = await axios.get(`${SERVER_URL}/Good`)
      setShowPosts(result_posts.data)
      // const result_images = await axios.get(`${SERVER_URL}/images`)
      // setShowImages(result_images.data)
    }
    fetchData()
  }, [])

  return (
    <MainTemplate>
      <S.TakerContainer>
        <ImageCarouselArea config={config} />
        {showPosts.map(({ main_category, sub_category, title, description, status, created_at, user_id }) => (
          <PostArea
            nickname={user_id[0]}
            location={user_id[1]}
            status={status}
            title={title}
            firstCategory={main_category}
            secondCategory={sub_category}
            createdTime={created_at}
            productDetails={description}
          />
        ))}
        <CommentArea />
      </S.TakerContainer>
    </MainTemplate>
  );
};

export default TakerPage;
