import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/Loader';
import KakaoLogin from '../../components/Login/Kakao';
import NaverLogin from '../../components/Login/Naver';
import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';
import AlertModal from '../../components/Modal/Alert';
import ConfirmModal from '../../components/Modal/Confirm';

import * as S from './styles';
import { useEffect } from 'react';

export interface LoginPageProps {
  userId: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
  } = useForm<LoginPageProps>({ mode: 'onBlur' });
  const {
    handleLogin,
    isLoading,
    error,
    alertMessage,
    showModal,
    setShowModal,
  } = useAuth<LoginPageProps>();
  useEffect(() => {
    if (error) {
      setError(error.field, {
        type: 'manual',
        message: error.message,
      });
    }
  });
  const handleLoginSubmit = (data: LoginPageProps) => {
    handleLogin(data);
  };
  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>로그인</S.H1>
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <Input
              label="아이디"
              placeholder="아이디 입력"
              {...register('userId', {
                required: '아이디는 필수 입력입니다.',
              })}
              errors={errors}
            />
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                pattern: {
                  value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
                  message:
                    '영문, 숫자를 포함한 6자 이상의 비밀번호를 입력해주세요.',
                },
              })}
              errors={errors}
            />
            {isValid ? (
              <S.ActiveLoginButton disabled={isLoading}>
                {isLoading ? <Loader /> : '로그인'}
              </S.ActiveLoginButton>
            ) : (
              <S.InactiveLoginButton disabled>로그인</S.InactiveLoginButton>
            )}

            <S.Hr />
            <S.SocialLogin>
              <KakaoLogin />
              <NaverLogin />
            </S.SocialLogin>
          </form>

          <S.Comment>
            <span>아직 회원이 아니라면?</span>
            <span>
              <Link to="/signup">
                <S.Emphasis>회원가입 </S.Emphasis>
              </Link>
              하러가기
            </span>
          </S.Comment>
          {showModal && alertMessage === '서버에 연결할 수 없습니다.' && (
            <AlertModal
              title="로그인"
              message="로그인에 실패하였습니다. 다시 시도해주세요."
              confirmType="warning"
              onConfirm={() => navigate('/signin')}
            />
          )}
          {showModal &&
            alertMessage ===
              '가입되어 있지 않습니다. 회원가입을 진행하시겠습니까?' && (
              <ConfirmModal
                title="로그인"
                message="가입되어 있지 않습니다. 회원가입을 진행하시겠습니까?"
                confirmType="confirm"
                onCancel={() => setShowModal(false)}
                onConfirm={() => navigate('/signup')}
              />
            )}
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default LoginPage;
