import * as S from './styles';
import kakaoLoginImg from '/public/images/kakao.png';

function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <S.KakaoLoginButton
      alt="카카오 로그인"
      onClick={handleKakaoLogin}
      src={kakaoLoginImg}
    ></S.KakaoLoginButton>
  );
}

export default KakaoLogin;
