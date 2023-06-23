import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopLayer from '../../PopLayer';

import * as S from './styles';

function Header() {
  const navigate = useNavigate();

  // 로그인 및 비로그인 상태에 따라 다른 컴포넌트 렌더링
  // NOTE: UI 구현 시 상태토글을 위해 임의로 로그인 및 로그아웃 상태를 localStorage로 구현
  const [isAuthUser, setIsAuthUser] = useState<boolean>(
    !!localStorage.getItem('authUser')
  );
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthUser) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isAuthUser]);

  // UI 구현 시 필요한 useEffect
  useEffect(() => {
    localStorage.setItem('authUser', 'dDKWKdkjwkqoUDUW2');
  }, []);

  // 경로 변경 함수
  const routeChange = (routePath: string) => {
    navigate(`/${routePath}`);
  };

  // PopLayer 메뉴 리스트
  // TODO : routePath를 마이페이지, 프로필 수정 페이지 생길 때 적절한 경로로 변경
  // TODO : 로그아웃 기능 구현
  const menuList = [
    {
      name: '마이페이지',
      onClickHandler: () => routeChange('mypage'),
    },
    {
      name: '프로필 수정',
      onClickHandler: () => routeChange('editPropile'),
    },
    {
      name: '로그아웃',
      onClickHandler: () => {
        // TODO : Confirm 모달로 변경
        if (window.confirm('로그아웃 하시겠습니까?')) {
          localStorage.removeItem('authUser');
        }
        setIsAuthUser(false); // localStorage 값 변경 시 state update
      },
      itemStyle: { color: 'red' },
    },
  ];

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderRightMenu>
          {isLogin ? (
            <PopLayer itemList={menuList}>
              {/* 팝 레이어 */}
              {/* 유저 프로필 */}
              <S.UserProfileImage>
                <img
                  src="https://via.placeholder.com/55"
                  alt="유저 프로필 이미지"
                />
              </S.UserProfileImage>
            </PopLayer>
          ) : (
            <>
              {/* 로그인 버튼  */}
              <button
                style={{ fontWeight: '600' }}
                onClick={() => routeChange('login')}
              >
                로그인
              </button>
              <span style={{ fontWeight: '600' }} aria-hidden>
                &nbsp;/&nbsp;
              </span>
              {/* 회원가입 버튼  */}
              <button
                style={{ fontWeight: '600' }}
                onClick={() => routeChange('register')}
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
