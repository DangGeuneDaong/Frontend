import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from '../styles';
import Loader from '../../../components/Loader';
import AlertModal from '../../../components/Modal/Alert';

function RedirectKakaoPage() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
    const link = `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${CLIENT_SECRET}`;

    axios
      .post(
        link,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) =>
        axios.post(
          `http://13.209.220.63/oauth/kakaoLogin?accessToken=${res.data.access_token}`
        )
      )
      .then((res) => {
        console.log(res);
        const { access_token: accessToken } = res.data;

        if (!accessToken) {
          setAlertMessage('로그인에 실패하였습니다.');
        }

        //엑세스 토큰 G => addinfoPage
        if (accessToken && accessToken.startsWith('G')) {
          localStorage.setItem('accessToken', accessToken.slice(1));
          navigate('/addInfo');
          //엑세스 토큰 U => mainPage
        } else if (accessToken && accessToken.startsWith('U')) {
          //앞글자 제거 후 로컬에 저장
          localStorage.setItem('accessToken', accessToken.slice(1));
          navigate('/');
        }
      })
      .catch((error) => {
        if (error) {
          setAlertMessage('로그인에 실패하였습니다.');
        }
        console.error(error);
      });
  }, []);
  return (
    <S.Container>
      <Loader />
      {alertMessage && (
        <AlertModal
          title={'로그인'}
          message={'로그인에 실패하였습니다. 다시 시도해주세요.'}
          confirmType="warning"
          confirmText="확인"
          onConfirm={() => navigate('/signin')}
        />
      )}
    </S.Container>
  );
}

export default RedirectKakaoPage;
