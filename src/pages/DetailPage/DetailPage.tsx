import S from './DetailPage.styles';

// import NavBar from '../../components/NavBar/NavBar'
// import Footer from '../../components/Footer/Footer'
import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';
import MainTemplate from '../../components/template/MainTemplate'

const config = [
  {
    title: 'image one',
    image: 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'image two',
    image: 'https://images.unsplash.com/photo-1597843786186-826cc3489f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'image three',
    image: 'https://images.unsplash.com/photo-1616668983570-a971956d8928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
  }
]

const DetailPage = () => {
  return (
    <MainTemplate>
      <S.Container>
        <ImageCarouselArea config={config} />
        <PostArea
          nickname={"whale2200d"}
          location={"대구 달서구 대곡동"}
          productName={"웰시코기 유기농 사료"}
          firstCategory={"강아지"}
          secondCategory={"사료"}
          uploadTime={"1달 전"}
          productDetails={"안녕하세요! 웰시코기 유기농 사료 나눔합니다!"}
        />
        <CommentArea />
      </S.Container >
    </MainTemplate>
  );
};

export default DetailPage;