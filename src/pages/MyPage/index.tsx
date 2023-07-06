import { useRecoilState } from 'recoil';
import { userState } from '../../states/userInfo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../apis/auth/api';

import { FaUser } from 'react-icons/fa';

import MainTemplate from '../../components/template/MainTemplate';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/Confirm';

import * as S from './styles';

interface MyPostsProps {
  goodId: number;
  title: string;
  featuredImage: string; //가장 첫번째 이미지
  updatedAt: string;
  location: string;
  sharingApplicatonNum: number;
  status: string;
}

function MyPage() {
  const [userData, setUserData] = useRecoilState(userState);
  const [selected, setSelected] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const LIMIT = 3;
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
  const queryClient = useQueryClient();
  const myPostsQueries = useQueries([
    {
      queryKey: ['myWrittenPosts', userData.userId],
      queryFn: async () => {
        const res = await instance.get(`/good/offer?userId=${userData.userId}`);
        return res.data;
      },
      enabled: !!userData.userId,
      onSuccess: (data: MyPostsProps[]) => setMyWrittenPosts(data),
      onError: (error: any) => {
        console.error(error);
      },
    },
    {
      queryKey: ['myAppliedPosts', userData.userId],
      queryFn: async () => {
        const res = await instance.get(
          `/sharing/list?userId=${userData.userId}`
        );
        return res.data;
      },
      enabled: !!userData.userId,
      onSuccess: (data: MyPostsProps[]) => setMyAppliedPosts(data),
      onError: (error: any) => {
        console.error(error);
      },
    },
  ]);

  const mutationShared = useMutation(
    async () => {
      if (selected === null) return;
      const res = await instance.put(`good/offer/status?goodId=${selected}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myWrittenPosts', userData.userId]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const mutationDeleted = useMutation(
    async () => {
      if (selected === null) return;
      const res = await instance.delete(`good/offer/info?goodId=${selected}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myWrittenPosts', userData.userId]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
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
          onConfirm={() => {
            mutationDeleted.mutate();
            setIsDeleted(false);
          }}
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
          onConfirm={() => {
            mutationShared.mutate();
            setIsShared(false);
          }}
        />
      )}
      <S.Container>
        <S.SubContainer>
          <S.UpdateContainer>
            <S.UserContainer>
              <S.Span>
                <Link to={'/edit-profile'}>프로필 수정 </Link>
              </S.Span>
              <S.ProfileImg src={userData.profileUrl} />
              <h3>{userData.nickName}</h3>
            </S.UserContainer>
          </S.UpdateContainer>

          <S.ListContainer>
            <S.Breadcrumb>
              <S.BreadcrumbSpan onClick={() => setFilter('all')}>
                전체{' '}
              </S.BreadcrumbSpan>
              |
              <S.BreadcrumbSpan
                onClick={() => {
                  setFilter('shared');
                }}
              >
                나눔완료 글{' '}
              </S.BreadcrumbSpan>
              |
              <S.BreadcrumbSpan onClick={() => setFilter('applied')}>
                신청한 글
              </S.BreadcrumbSpan>
            </S.Breadcrumb>
            <S.List>
              {currentPagePosts ? (
                currentPagePosts?.map((post) => (
                  <S.Post key={post.goodId}>
                    <S.PostInfos>
                      <S.PostImg src={post.featuredImage[0]} />
                      <S.Description>
                        <S.DescriptionUp>
                          <S.Title
                            onClick={() => navigate(`/offer/${post.goodId}`)}
                          >
                            {post.title}
                          </S.Title>
                          <span>{post.updatedAt}</span>
                        </S.DescriptionUp>

                        <S.DescriptionDown>
                          <S.Nums>{post.location}</S.Nums>
                          <S.Nums>
                            <FaUser />{' '}
                            {post.sharingApplicatonNum === 0
                              ? 0
                              : post.sharingApplicatonNum}
                          </S.Nums>
                        </S.DescriptionDown>
                      </S.Description>
                    </S.PostInfos>

                    <S.UpdatePost>
                      {filter === 'all' ||
                        (filter === 'shared' && (
                          <>
                            <Button
                              type="button"
                              styleType={
                                post.status === 'SHARING'
                                  ? 'primary'
                                  : 'disabled'
                              }
                              borderRadius="20px"
                              hoverStyle="background-color:"
                              onClickHandler={() => {
                                setSelected(post.goodId);
                                setIsShared(true);
                              }}
                            >
                              나눔완료
                            </Button>

                            <S.PostInfo>
                              <S.UpdateBtn
                                onClick={() => navigate(`/edit/${post.goodId}`)}
                              >
                                수정
                              </S.UpdateBtn>
                              <S.UpdateBtn
                                onClick={() => {
                                  setSelected(post.goodId);
                                  setIsDeleted(true);
                                }}
                              >
                                삭제
                              </S.UpdateBtn>
                            </S.PostInfo>
                          </>
                        ))}
                    </S.UpdatePost>
                  </S.Post>
                ))
              ) : (
                <S.Empty>
                  <h3>게시물이 존재하지 않습니다.</h3>
                </S.Empty>
              )}
            </S.List>
            <Pagination
              total={totalPosts?.length || 0}
              limit={3}
              page={page}
              setPage={setPage}
            />
          </S.ListContainer>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default MyPage;
