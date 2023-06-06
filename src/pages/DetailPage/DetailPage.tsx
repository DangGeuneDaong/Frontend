import S from './DetailPage.styles';

// import NavBar from '../../components/NavBar/NavBar'
// import Footer from '../../components/Footer/Footer'
import ImageCarouselArea from '../../components/ImageCarouselArea';
import PostArea from '../../components/PostArea';
import CommentArea from '../../components/CommentArea';

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
    <S.Container>
      <ImageCarouselArea config={config} />
      <PostArea
        nickname={"whale2200d"}
        location={""}
        productName={ }
        firstCategory={ }
        secondCategory={ }
        uploadTime={ }
        productDetails={ }
      />
      <textarea placeholder="궁금한 사항을 적어주세요!"></textarea>
      <button>신청하기</button>
    </div>
      {/* <S.Container>
        
        <PostArea>
          {"PostArea"}
        </PostArea>
        <CommentArea>
          {"CommentArea"}
        </CommentArea>
      </S.Container> */}
    </S.Container >
  );
};

export default DetailPage;