import { useState } from 'react';
import axios from 'axios';

import { LoginPageProps } from '../pages/LoginPage';
//import { JoinPageProps } from '../pages/JoinPage';
import {
  //registerRequest,
  loginRequest,
} from '../apis/auth/api';

export function useAuth() {
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

  return {
    handleLogin,
    //handleRegister,
    isLoading,
    error,
    alertMessage,
    showModal,
  };
}
