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
    const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;
    const link = `https://nid.naver.com/oauth2.0/token?grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

    axios.post(
      link,
      {},
      {
        headers: {
          'Content-Type': '',
        },
      }
    );
  });
  return <AddInfoPage accessToken={accessToken} />;
}

export default RedirectNaverPage;
