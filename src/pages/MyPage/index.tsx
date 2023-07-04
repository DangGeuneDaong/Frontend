import { useRecoilState } from 'recoil';
import { userInfoState } from '../../states/userInfo';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../apis/auth/api';

import { FaUser } from 'react-icons/fa';

import MainTemplate from '../../components/template/MainTemplate';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/Confirm';

import * as S from './styles';

interface MyPostsProps {
  id: number;
  title: string;
  featuredImage: string; //가장 첫번째 이미지
  updatedAt: string;
  location: string;
  sharingApplicatonNum: number;
  status: string;
}

function MyPage() {
  const [userData, setUserData] = useRecoilState(userInfoState);
  const [selected, setSelected] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const LIMIT = 5;
  const offset = (page - 1) * LIMIT;
  const [myWrittenPosts, setMyWrittenPosts] = useState<
    MyPostsProps[] | undefined
  >();
  const [myAppliedPosts, setMyAppliedPosts] = useState<
    MyPostsProps[] | undefined
  >();
  const navigate = useNavigate();
  const totalPosts =
    filter === 'all'
      ? myWrittenPosts
      : filter === 'shared'
      ? myWrittenPosts?.filter((post) => post.status === 'COMPLETE')
      : myAppliedPosts;
  const currentPagePosts = totalPosts?.slice(offset, offset + LIMIT);

  const getMyPosts = async () => {
    try {
      //마이페이지 > 내가 쓴 글
      const writtenResponse = await instance.get(
        `/good/offer?userId=${userData.userId}`
      );
      //마이페이지 > 나눔 신청한 글
      const appliedResponse = await instance.get(
        `/sharing/list?userId=${userData.userId}`
      );
      setMyWrittenPosts(writtenResponse.data);
      setMyAppliedPosts(appliedResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyPosts();
  }, []);

  //나눔완료 변경
  const handleShared = async () => {
    try {
      if (selected === null) return;
      await instance.put(`good/offer/status?goodId=${selected}`);
      setMyWrittenPosts(
        myWrittenPosts?.map((post) =>
          post.id === selected ? { ...post, status: 'COMPLETE' } : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  //나눔글 삭제
  const handleDelete = async (id: number) => {
    try {
      if (selected === null) return;
      await instance.delete(`good/offer/info?goodId=${selected}`);
      setMyWrittenPosts(myWrittenPosts?.filter((post) => post.id !== selected));
    } catch (error) {
      console.error(error);
    }
  };
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
          onConfirm={() => handleShared}
        />
      )}
      <S.Container>
        <S.SubContainer>
          <S.UpdateContainer>
            <S.UserContainer>
              <S.Span>
                <Link to={'/edit-profile'}>프로필 수정 </Link>
              </S.Span>
              <S.ProfileImg src={userData.profile_url} />
              <h3>{userData.nickName}</h3>
            </S.UserContainer>
          </S.UpdateContainer>

          <S.ListContainer>
            <S.Breadcrumb>
              <S.BreadcrumbSpan onClick={() => setFilter('all')}>
                전체 |
              </S.BreadcrumbSpan>
              <S.BreadcrumbSpan
                onClick={() => {
                  setFilter('shared');
                }}
              >
                나눔완료한 글 |
              </S.BreadcrumbSpan>
              <S.BreadcrumbSpan onClick={() => setFilter('applied')}>
                신청한 글
              </S.BreadcrumbSpan>
            </S.Breadcrumb>
            <S.List>
              {currentPagePosts ? (
                currentPagePosts?.map((post) => (
                  <S.Post key={post.id}>
                    <S.PostInfos>
                      <S.PostImg src={post.featuredImage} />
                      <S.Description>
                        <S.DescriptionUp>
                          <S.Title
                            onClick={() => navigate(`/offer/${post.id}`)}
                          >
                            {post.title}
                          </S.Title>
                          <span>{post.updatedAt}</span>
                        </S.DescriptionUp>

                        <S.DescriptionDown>
                          <S.Nums>{post.location}</S.Nums>
                          <S.Nums>
                            <FaUser /> {post.sharingApplicatonNum}
                          </S.Nums>
                        </S.DescriptionDown>
                      </S.Description>
                    </S.PostInfos>

                    <S.UpdatePost>
                      {filter === 'shared' && (
                        <>
                          <Button
                            type="button"
                            styleType={
                              post.status === 'SHARING' ? 'primary' : 'disabled'
                            }
                            borderRadius="20px"
                            hoverStyle="background-color:"
                            onClickHandler={() => {
                              setSelected(post.id);
                              setIsShared(true);
                            }}
                          >
                            나눔완료
                          </Button>

                          <S.PostInfo>
                            <S.UpdateBtn
                              onClick={() => navigate(`/edit/${post.id}`)}
                            >
                              수정
                            </S.UpdateBtn>
                            <S.UpdateBtn
                              onClick={() => {
                                setSelected(post.id);
                                setIsDeleted(true);
                              }}
                            >
                              삭제
                            </S.UpdateBtn>
                          </S.PostInfo>
                        </>
                      )}
                    </S.UpdatePost>
                  </S.Post>
                ))
              ) : (
                <S.Empty>
                  <h2>게시물이 존재하지 않습니다.</h2>
                </S.Empty>
              )}

              <Pagination
                total={totalPosts?.length || 0}
                limit={3}
                page={5}
                setPage={setPage}
              />
            </S.List>
          </S.ListContainer>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default MyPage;
