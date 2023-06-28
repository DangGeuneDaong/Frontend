import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';
import SearchLocation from '../../components/SearchLocation';
import AlertModal from '../../components/Modal/Alert';

import * as S from './styles';
import Loader from '../../components/Loader';
import { useEffect } from 'react';

export interface JoinPageProps {
  nickname: string;
  userId: string;
  password: string;
  pwConfirm?: string;
  location: string;
  extraError?: string;
}

function JoinPage() {
  const navigate = useNavigate();
  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<JoinPageProps>({ mode: 'onBlur' });
  const password = watch('password');
  const { handleRegister, isLoading, error, alertMessage, showModal } =
    useAuth<JoinPageProps>();

  useEffect(() => {
    if (error) {
      setError(error.field, {
        type: 'manual',
        message: error.message,
      });
    }
  }, [error, setError]);
  const onValid = async (data: JoinPageProps) => {
    //비밀번호 확인은 따로 보내진않음.
    handleRegister(data);
  };

  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>회원가입</S.H1>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              label="닉네임"
              placeholder="닉네임 입력"
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '닉네임은 2글자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 12,
                  message: '닉네임은 12글자 이하로 입력해주세요.',
                },
              })}
              errors={errors}
            />

            <Input
              label="아이디"
              placeholder="아이디 입력"
              {...register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9]{4,12}$/,
                  message: '대소문자 또는 숫자로 4-12글자 입력해주세요.',
                },
              })}
              errors={errors}
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="영문, 숫자 포함 6자 이상"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
                  message:
                    '영문, 숫자를 포함한 6자 이상의 비밀번호를 입력해주세요.',
                },
              })}
              errors={errors}
            />

            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호 입력"
              {...register('pwConfirm', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다.',
              })}
              errors={errors}
            />
            <S.LoacationContainer>
              <Controller
                control={control}
                name="location"
                defaultValue=""
                rules={{ required: '주소를 입력해주세요.' }}
                render={({ field }) => (
                  <Input
                    label="주소정보 입력"
                    placeholder="주소 입력"
                    {...field}
                    readOnly
                  />
                )}
              />
              <SearchLocation setValue={setValue} trigger={trigger} />
            </S.LoacationContainer>

            {errors.extraError && <span>{errors.extraError.message}</span>}

            {isValid ? (
              <S.ActiveJoinButton>
                {isLoading ? <Loader /> : '회원가입'}
              </S.ActiveJoinButton>
            ) : (
              <S.InactiveJoinButton disabled>회원가입</S.InactiveJoinButton>
            )}
          </form>
        </S.SubContainer>

        {showModal && alertMessage === '회원가입이 완료되었습니다.' ? (
          <AlertModal
            title="환영합니다🎉"
            message={'회원가입이 완료되었습니다.'}
            onConfirm={() => navigate('/signin')}
          />
        ) : (
          <AlertModal
            title="회원가입"
            message={'회원가입에 실패하였습니다. 다시 시도해주세요.'}
            onConfirm={() => navigate('/signup')}
          />
        )}
      </S.Container>
    </MainTemplate>
  );
}

export default JoinPage;
