import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../states/userInfo';
import { LoginPageProps } from '../pages/LoginPage';
import { JoinPageProps } from '../pages/JoinPage';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  userProfileRequest,
} from '../apis/auth/api';

export function useAuth<T extends { [key: string]: any }>() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    field: keyof T;
    message: string;
  } | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userInfoState);

  //회원가입 함수
  const handleRegister = async (data: JoinPageProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const { pwConfirm, ...postData } = data;
      await registerRequest(postData);

      setAlertMessage('회원가입이 완료되었습니다.');
      setShowModal(true);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        switch (error.response.data.message) {
          case 'Duplicate nickname':
            setError({
              field: 'nickname',
              message: '해당 닉네임은 이미 사용 중입니다.',
            });
            break;
          case 'Duplicate userId':
            setError({
              field: 'userId',
              message: '해당 아이디는 이미 사용 중입니다.',
            });
            break;
          default:
            setAlertMessage('회원가입에 실패하였습니다.');
            setShowModal(true);
        }
      } else {
        setAlertMessage('서버에 연결할 수 없습니다.');
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //로그인 요청 함수
  const handleLogin = async (data: LoginPageProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginRequest(data);

      //유저 정보 가져와 상태로 관리
      const userInfo = await getUserProfile(data.userId);
      setUser(userInfo);
      await navigate('/');
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data.message) {
        switch (error.response.data.message) {
          case 'Not Match password':
            setError({
              field: 'password',
              message: '비밀번호가 일치하지 않습니다.',
            });
            break;
          // default:
          //   setAlertMessage(
          //     '가입되어 있지 않습니다. 회원가입을 진행하시겠습니까?'
          //   );
          //   setShowModal(true);
        }
      } else {
        setAlertMessage('서버에 연결할 수 없습니다.');
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProfile = async (userId: string) => {
    const response = await userProfileRequest(userId);
    return response.data;
  };

  //로그아웃 함수
  const handleLogout = async () => {
    try {
      const response = await logoutRequest();
      if (response.status !== 200) throw new Error('서버가 작동하지 않습니다.');

      //로컬에서 accessToken 삭제
      localStorage.removeItem('accessToken');
      //상태 삭제
      setUser(null);
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    getUserProfile,
    isLoading,
    error,
    alertMessage,
    showModal,
  };
}
