import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../states/authState';
import { LoginPageProps } from '../pages/LoginPage';
import { loginRequest, silentRefreshRequest } from '../apis/api';

//엑세스토큰 만료시간 : 6시간
const JWT_EXPIRY_TIME = 6 * 60 * 60 * 1000;

export function useAuth() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  //로그인 요청 함수
  const handleLogin = async (data: LoginPageProps) => {
    setIsLoading(true);
    try {
      const response = await loginRequest(data);
      if (response.status !== 200) throw new Error('서버가 작동하지 않습니다.');

      const { accessToken } = response.data;
      if (!accessToken) throw new Error('토큰이 존재하지 않습니다.');
      setIsLoading(false);
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  };
  //토큰이 만료되기 전 요청하는 함수로 자동으로 토큰 갱신
  const handleSilentRefresh = async () => {
    try {
      const response = await silentRefreshRequest();
      if (response.status !== 200) throw new Error('서버가 작동하지 않습니다.');

      const { accessToken } = response.data;
      if (!accessToken) throw new Error('토큰이 존재하지 않습니다.');
      setAccessToken(accessToken);
    } catch (error: any) {
      setError(error);
    }
  };
  //페이지가 로드될때마다 저장된 액세스토큰이 있으면 recoil 상태에 업데이트
  //액세스 토큰이 변경될때마다 정해진 시간 후에 handleSilentRefresh를 호출해서 액세스 토큰 갱신
  useEffect(() => {
    //사용자가 웹사이트를 다시 방문하거나 페이지를 새로고침할때마다 setTimeout이 초기화되는 것 방지
    let refreshTimeout: NodeJS.Timeout;
    if (accessToken) {
      refreshTimeout = setTimeout(handleSilentRefresh, JWT_EXPIRY_TIME);
    }
    return () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [accessToken]);

  return { handleLogin, isLoading, error };
}
