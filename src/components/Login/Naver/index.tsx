import naverLoginImg from '/public/images/naver.png';

import * as S from './styles';

function NaverLogin() {
  const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const CALLBACK_URL = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

  const handleNaverLogin = () => {
    window.location.href = link;
  };
  return (
    <S.NaverLoginButton
      alt="socialLogin_Naver"
      onClick={handleNaverLogin}
      src={naverLoginImg}
    ></S.NaverLoginButton>
  );
}

export default NaverLogin;
