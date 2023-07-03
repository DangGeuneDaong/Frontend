import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfoState } from '../../../states/userInfo';
import { useRecoilState } from 'recoil';
import { useAuth } from '../../../hooks/useAuth';
import PopLayer from '../../PopLayer';
import ConfirmModal from '../../Modal/Confirm';

import * as S from './styles';

function Header() {
  const navigate = useNavigate();

  // 로그인 및 비로그인 상태에 따라 다른 컴포넌트 렌더링
  // NOTE: UI 구현 시 상태토글을 위해 임의로 로그인 및 로그아웃 상태를 localStorage로 구현
  const [isLogged, setIsLogged] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  );
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleLogout } = useAuth();

  // 경로 변경 함수
  const routeChange = (routePath: string) => {
    navigate(`/${routePath}`);
  };

  const menuList = [
    {
      name: '마이페이지',
      onClickHandler: () => routeChange('mypage'),
    },
    {
      name: '프로필 수정',
      onClickHandler: () => routeChange('editProfile'),
    },
    {
      name: '로그아웃',
      onClickHandler: () => {
        setIsModalOpen(true);
      },
      itemStyle: { color: 'red' },
    },
  ];

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        {isModalOpen && (
          <ConfirmModal
            title="로그아웃"
            message="로그아웃 하시겠습니까?"
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => handleLogout()}
          />
        )}
        <S.HeaderRightMenu>
          {isLogged ? (
            <PopLayer itemList={menuList}>
              <S.UserProfileImage>
                <img
                  src={
                    userInfo.profile_url
                      ? userInfo.profile_url
                      : 'https://www.thechooeok.com/common/img/default_profile.png'
                  }
                  alt="유저 프로필 이미지"
                />
              </S.UserProfileImage>
            </PopLayer>
          ) : (
            <>
              {/* 로그인 버튼  */}
              <button
                style={{ fontWeight: '600' }}
                onClick={() => routeChange('signin')}
              >
                로그인
              </button>
              <span style={{ fontWeight: '600' }} aria-hidden>
                &nbsp;/&nbsp;
              </span>
              {/* 회원가입 버튼  */}
              <button
                style={{ fontWeight: '600' }}
                onClick={() => routeChange('signup')}
              >
                회원가입
              </button>
            </>
          )}
        </S.HeaderRightMenu>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
}

export default Header;
