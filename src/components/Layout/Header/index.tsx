import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../../states/userInfo';
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
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { handleLogout, showModal, setShowModal } = useAuth();

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
      onClickHandler: () => routeChange('edit-profile'),
    },
    {
      name: '로그아웃',
      onClickHandler: () => {
        setShowModal(true);
      },
      itemStyle: { color: 'red' },
    },
  ];

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <img
          src="https://github.com/DangGeuneDaong/Frontend/assets/110911811/5e6c9fbc-6154-4482-82f3-11a6625ed781"
          alt="Logo"
          width={50}
          height={50}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />

        {showModal && (
          <ConfirmModal
            title="로그아웃"
            message="로그아웃 하시겠습니까?"
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              handleLogout();
              setShowModal(false);
            }}
          />
        )}
        <S.HeaderRightMenu>
          {isLogged ? (
            <PopLayer itemList={menuList}>
              <S.UserProfileImage>
                <img
                  src={
                    userInfo.profileUrl
                      ? userInfo.profileUurl
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
