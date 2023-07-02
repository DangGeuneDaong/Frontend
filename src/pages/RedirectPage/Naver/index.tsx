import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from '../styles';
import Loader from '../../../components/Loader';

function RedirectNaverPage() {
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
        if (accessToken) {
          const firstStr = accessToken[0];
          if (firstStr === 'G') {
            navigate('/addInfo');
            //엑세스 토큰 U => mainPage
          } else if (firstStr === 'U') {
            navigate('/main');
          }
        }
      })

      .catch((error) => {
        if (error.response) {
          //요청이 이루어졌으나 서버가 2xx 범위 이외로 응답한 경우
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          //요청이 이루어졌으나 응답을 받지 못한 경우
          console.log(error.request);
        } else {
          //요청에 오류가 발생한 경우
          console.log(error.message);
        }
        console.log(error.config);
      });
  }, []);
  return (
    <S.Container>
      <Loader />
    </S.Container>
  );
}

export default RedirectNaverPage;
