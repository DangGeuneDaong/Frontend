import axios from 'axios';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';

import MainTemplate from '../../components/template/MainTemplate';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/Confirm';

import * as S from './styles';

interface MyPostsProps {
  id: number;
  title: string;
  featuredImage: string; //(가장 첫번째로 등록된 이미지를 보내드려요)!
  updatedAt: string;
  location: string;
  sharingApplicationNum: number; //신청자수
  status: string;
}

function MyPage() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const LIMIT = 5;
  const offset = (page - 1) * LIMIT;
  const [myPosts, setMyPosts] = useState<MyPostsProps[] | undefined>();
  const navigate = useNavigate();
  const profileUrl =
    'https://www.thechooeok.com/common/img/default_profile.png';

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const response = await axios.get('/:userId');
        //setMyPosts(response.data);
        setMyPosts([
          {
            id: 1,
            title: 'title',
            featuredImage: 'goodImage1',
            updatedAt: '2023-06-15T16:08:27.028199',
            location: '서울 강남구',
            sharingApplicationNum: 0,
            status: 'sharing',
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    getMyPosts();
  }, []);

  const handleShared = async (id: number) => {
    setIsShared(true);
    try {
      await axios.patch(`/${id}`, { status: 'shared' });
      //setMyPosts(myPosts.map(post=>post.id === id ? {...postState, status:'shared'} : post))
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatus = async (id: number) => {
    try {
      await axios.patch(`/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = async (id: number) => {
    setIsDeleted(true);
    try {
      await axios.delete(`/${id}`);
      setMyPosts(myPosts!.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  let filteredPosts = myPosts;
  return (
    <MainTemplate>
      {isDeleted && (
        <ConfirmModal
          title={'게시물 삭제'}
          message={'해당 게시물을 삭제하시겠습니까?'}
          confirmType="confirm"
          confirmText="확인"
          cancelText="취소"
          alignType="top"
          onCancel={() => setIsDeleted(false)}
          onConfirm={() => handleDelete}
        />
      )}
      {isShared && (
        <ConfirmModal
          title={'나눔 완료'}
          message={'좋은 나눔이 되셨나요?'}
          confirmType="confirm"
          confirmText="확인"
          cancelText="취소"
          alignType="top"
          onCancel={() => setIsShared(false)}
          onConfirm={() => handleDelete}
        />
      )}
      <S.Container>
        <S.SubContainer>
          <S.UpdateContainer>
            <S.UserContainer>
              <S.Span>
                <Link to={'/edit-profile'}>프로필 수정 </Link>
              </S.Span>
              <S.ProfileImg src={profileUrl} />
              <h3>닉네임</h3>
            </S.UserContainer>
          </S.UpdateContainer>

          <S.ListContainer>
            <S.Breadcrumb>
              <span onClick={() => setFilter('all')}>전체</span> |{' '}
              <span
                onClick={() => {
                  setFilter('shared');
                }}
              >
                나눔완료
              </span>{' '}
              |{' '}
              <span onClick={() => setFilter('received')}>나눔 신청한 글</span>
            </S.Breadcrumb>
            <S.List>
              {/* //{
              // let filteredPosts = myPosts;
              // if(filter === 'shared'){
              //   filteredPosts = myPosts.filter(post=>post.status === 'shared')
              //   //나눔받은글?
              // }else if(filter === 'received'){
              //   filteredPosts = myPosts.filter(post=>post.status == 'received')
              // }
              // filteredPosts.slice(offset, offset+LIMIT).map((post, id)=>{})
              // }
              // {myPosts.slice(offset, offset + LIMIT).map((post,id) => {})} */}

              <S.Post>
                <S.PostInfos>
                  <S.PostImg src={'featuredImage'} />
                  <S.Description>
                    <S.DescriptionUp>
                      <h3>{'title'}</h3>
                      <span>{'updatedAt'}</span>
                    </S.DescriptionUp>

                    <S.DescriptionDown>
                      <S.Nums>{'location'}</S.Nums>
                      <S.Nums>
                        <FaUser /> {'sharingApplicatonNum'}
                      </S.Nums>
                    </S.DescriptionDown>
                  </S.Description>
                </S.PostInfos>

                <S.UpdatePost>
                  <Button
                    type="button"
                    // styleType={
                    //   post.status === 'sharing' ? 'primary' : 'disabled'
                    // }
                    borderRadius="20px"
                    hoverStyle="background-color:"
                    onClickHandler={() => handleShared}
                  >
                    나눔완료
                  </Button>

                  <S.PostInfo>
                    <S.UpdateBtn>수정</S.UpdateBtn>
                    <S.UpdateBtn>삭제</S.UpdateBtn>
                  </S.PostInfo>
                </S.UpdatePost>
              </S.Post>
              <Pagination total={10} limit={3} page={5} setPage={setPage} />
            </S.List>
          </S.ListContainer>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default MyPage;
