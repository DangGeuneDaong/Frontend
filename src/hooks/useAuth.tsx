import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../states/authState';
import { LoginPageProps } from '../pages/LoginPage';
//import { JoinPageProps } from '../pages/JoinPage';
import {
  //registerRequest,
  loginRequest,
  silentRefreshRequest,
} from '../apis/auth/api';

//엑세스토큰 만료시간 : 6시간
const JWT_EXPIRY_TIME = 6 * 60 * 60 * 1000;

export function useAuth() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  //회원가입 함수
  // const handleRegister = async (data: JoinPageProps) => {
  //   setIsLoading(true);
  //   try {
  //     const { pwConfirm, ...postData } = data;
  //     const response = await registerRequest(postData);
  //     if (response.status !== 200) throw new Error('서버가 작동하지 않습니다.');

  //     setAlertMessage('회원가입이 완료되었습니다.');
  //     setShowModal(true);
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     setAlertMessage(
  //       error.response
  //         ? error.response.data.message || '회원가입에 실패하였습니다.'
  //         : '서버에 연결할 수 없습니다.'
  //     );
  //     setShowModal(true);
  //     setIsLoading(false);
  //     setError(error);
  //   }
  // };
  //로그인 요청 함수
  const handleLogin = async (data: LoginPageProps) => {
    setIsLoading(true);
    try {
      const response = await loginRequest(data);
      if (response.status !== 200) throw new Error('서버가 작동하지 않습니다.');

      const { accessToken } = response.data;
      setAlertMessage('로그인이 완료되었습니다.');
      setShowModal(true);
      if (!accessToken) throw new Error('토큰이 존재하지 않습니다.');
      setIsLoading(false);
      setAccessToken(accessToken);
    } catch (error: any) {
      setAlertMessage(
        error.response
          ? error.response.data.message || '로그인에 실패했습니다.'
          : '서버에 연결할 수 없습니다.'
      );
      setShowModal(true);
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

  //액세스 토큰이 변경될때마다 만료시간 후에 handleSilentRefresh를 호출해서 액세스 토큰 갱신
  useEffect(() => {
    let refreshTimeout: NodeJS.Timeout;
    if (accessToken) {
      refreshTimeout = setTimeout(handleSilentRefresh, JWT_EXPIRY_TIME);
    }
    //useEffect가 다시 호출되는 경우 이전에 설정한 setTimeout을 초기화
    return () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [accessToken]);

  return {
    handleLogin,
    //handleRegister,
    isLoading,
    error,
    alertMessage,
    showModal,
  };
}
