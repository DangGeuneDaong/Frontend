import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { accessTokenState } from '../../states/authState';

import axios from 'axios';
import Loader from '../../components/Loader';
import KakaoLogin from '../../components/Login/Kakao';
import NaverLogin from '../../components/Login/Naver';
import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';

import * as S from './styles';

interface LoginPageProps {
  userId: string;
  password: string;
}

//서버에 로그인 요청 및 액세스토큰과 리프레시 토큰 처리
async function loginRequest(data: LoginPageProps) {
  try {
    const response = await axios.post('/signin', {
      userId: data.userId,
      password: data.password,
    });

    const { refreshToken, accessToken } = response.data;
    console.log(accessToken);
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken};`;
    }

    return { accessToken };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

// 리프레시토큰을 이용해서 새로 받은 액세스토큰과 리프레시토큰 처리
async function silentRefreshRequest(refreshToken: string) {
  try {
    const response = await axios.post('/silent-refresh', {
      refreshToken,
    });

    const { refreshToken: newRefreshToken, accessToken } = response.data;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    document.cookie = `refreshToken=${newRefreshToken};`;
    return { accessToken };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

function LoginPage() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginPageProps>({ mode: 'onBlur' });

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const JWT_EXPIRY_TIME = 6 * 60 * 60 * 1000; // 6시간 밀리초로 표현
  const { mutate: login, isLoading } = useMutation(loginRequest, {
    onSuccess: (data) => {
      const { accessToken } = data;

      //로그인 성공 시, accessToken 저장
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);

      //accessToken 만료 1분전 silent refresh 요청
      setTimeout(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          silentRefresh(refreshToken);
        }
      }, JWT_EXPIRY_TIME - 60000);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  const silentRefresh = (refreshToken: string) => {
    silentRefreshRequest(refreshToken)
      .then((data) => {
        const { accessToken } = data;

        //accessToken 갱신
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);

        //accessToken 만료 1분 전에 다시 silent refresh 요청
        setTimeout(() => {
          silentRefresh(refreshToken);
        }, JWT_EXPIRY_TIME - 60000);
      })
      .catch((error) => {
        // silent refresh 실패 처리
        console.error(error);
      });
  };

  //page가 로드(새로고침)될때마다 로컬 스토리지에서 토큰을 가져와 Recoil 상태에 저장하여 토큰 유지
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleLoginSubmit = (data: LoginPageProps) => {
    login(data);
  };

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
                minLength: {
                  value: 6,
                  message: '영문, 숫자 포함 6자 이상 입력해주세요.',
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
              <Link to="/register">
                <S.Emphasis>회원가입 </S.Emphasis>
              </Link>
              하러가기
            </span>
          </S.Comment>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default LoginPage;
