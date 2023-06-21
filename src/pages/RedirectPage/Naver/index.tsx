import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { naverAccessTokenState } from '../../../states/authState';
import AddInfoPage from '../AddInfoPage';

function RedirectNaverPage() {
  const [accessToken, setAccessToken] = useRecoilState(naverAccessTokenState);

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
      .then((res) => {
        console.log(res);
        //엑세스 토큰 저장
        setAccessToken(res.data.access_token);
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
  return <AddInfoPage accessToken={accessToken} />;
}

export default RedirectNaverPage;
