import { useNavigate } from 'react-router-dom';

import S from './Header.styles';

function Header() {
  const navigate = useNavigate();

  const routeChange = (routePath: string) => {
    navigate(`/${routePath}`);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderRightMenu>
          <>
            <button
              style={{ fontWeight: '600' }}
              onClick={() => routeChange('login')}
            >
              로그인
            </button>
            <strong aria-hidden>&nbsp;/&nbsp;</strong>
            <button
              style={{ fontWeight: '600' }}
              onClick={() => routeChange('register')}
            >
              회원가입
            </button>
          </>
        </S.HeaderRightMenu>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
}

export default Header;
