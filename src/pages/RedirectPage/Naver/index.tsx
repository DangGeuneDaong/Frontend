import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from '../styles';
import Loader from '../../../components/Loader';
import AlertModal from '../../../components/Modal/Alert';

function RedirectNaverPage() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;
    const link = `https://nid.naver.com/oauth2.0/token?grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;
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
        axios.post(`oauth/naverLogin?accessToken=${res.data.access_token}`)
      )
      .then((res) => {
        console.log(res);
        const { accessToken: accessToken } = res.data;
        //엑세스 토큰 G => addinfoPage
        if (!accessToken) {
          setAlertMessage('로그인에 실패하였습니다.');
        }

        //엑세스 토큰 G => addinfoPage
        if (accessToken && accessToken.startsWith('G')) {
          localStorage.setItem('accessToken', accessToken.slice(1));
          navigate('/addInfo');
          //엑세스 토큰 U => mainPage
        } else if (accessToken && accessToken.startsWith('U')) {
          localStorage.setItem('accessToken', accessToken.slice(1));
          navigate('/');
        }
      })

      .catch((error) => {
        if (error) {
          setAlertMessage('로그인에 실패하였습니다.');
        }
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

export default RedirectNaverPage;
