import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';
import SearchLocation from '../../components/Join/SearchLocation';
import Modal from '../../components/Modal';

import * as S from './styles';

export interface JoinPageProps {
  nickname: string;
  userId: string;
  password: string;
  pwConfirm: string;
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
    watch,
  } = useForm<JoinPageProps>({ mode: 'onBlur' });
  const password = watch('password');
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const onValid = async (data: JoinPageProps) => {
    //비밀번호 확인은 제거
    const { pwConfirm, ...postData } = data;
    try {
      const response = await axios.post('/register', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setAlertMessage('회원가입이 완료되었습니다.');
        setShowModal(true);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      setAlertMessage(
        error.response
          ? error.response.data.message || '회원가입에 실패했습니다.'
          : '서버에 연결할 수 없습니다.'
      );
      setShowModal(true);
    }
  };

  const closeAlert = () => {
    setAlertMessage(undefined);
    setShowModal(false);
    if (alertMessage === '회원가입이 완료되었습니다.') {
      navigate('/signin');
    }
  };

  return (
    <MainTemplate>
      {showModal && (
        <Modal
          onClose={closeAlert}
          color={alertMessage === '회원가입이 완료되었습니다' ? 'blue' : 'red'}
        >
          <span>{alertMessage}</span>
        </Modal>
      )}
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
                  value: 10,
                  message: '닉네임은 10글자 이하로 입력해주세요.',
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
            <SearchLocation setValue={setValue} />
            {errors.extraError && <span>{errors.extraError.message}</span>}

            {isValid ? (
              <S.ActiveJoinButton>회원가입</S.ActiveJoinButton>
            ) : (
              <S.InactiveJoinButton disabled>회원가입</S.InactiveJoinButton>
            )}
          </form>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default JoinPage;
