import { useForm, Controller } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';
import Loader from '../../components/Loader';
import SearchLocation from '../../components/SearchLocation';
import AlertModal from '../../components/Modal/Alert';

import * as S from './styles';

export interface EditProfilePageProps {
  nickName: string;
  location: string;
  profile_url: string;
}

function EditProfilePage() {
  const navigate = useNavigate();
  const { getUserProfile } = useAuth();
  const [nicknameEdited, setNicknameEdited] = useState<boolean>(false);
  const [initialProfile, setInitialProfile] = useState<string>('');
  const [initialNickname, setInitialNickname] = useState<string>('');
  const [initialLocation, setInitialLocation] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
  const { handleEditProfile, isLoading, error, alertMessage, showModal } =
    useAuth();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<EditProfilePageProps>({
    mode: 'onBlur',
    defaultValues: {
      nickName: initialNickname,
      location: initialLocation,
      profile_url: initialProfile,
    },
  });
  const watchProfileUrl = watch('profile_url');
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getUserProfile(accessToken)
        .then((userData) => {
          setInitialProfile(userData.profile_url);
          setInitialNickname(userData.nickName);
          setInitialLocation(userData.location);
          setValue('profile_url', userData.profile_url);
          setValue('profile_url', userData.profile_url);
          setValue('nickName', userData.nickName);
          setValue('location', userData.location);
        })
        .catch((error) => console.error('콘솔에러', error));
    }
  }, [setValue]);

  //프로필 사진 미리보기
  const onPreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      //file => URL
      const url = URL.createObjectURL(file);
      setValue('profile_url', url);

      // 읽기 동작이 성공적으로 완료 되었을 시 실행
      reader.onload = () => {
        if (reader.result) {
        }
      };
    }
  };
  const handleUploadImg = () => {
    fileInput.current?.click();
  };
  const resetImg = () => {
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    setValue('profile_url', initialProfile);
  };
  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>추가 정보 입력</S.H1>
          <S.Form
            onSubmit={handleSubmit((data) =>
              handleEditProfile(data, watchProfileUrl)
            )}
          >
            <S.ProfileImg src={watchProfileUrl} />
            {watchProfileUrl ? (
              <S.CancelButton onClick={resetImg}>
                프로필 이미지 변경 취소
              </S.CancelButton>
            ) : (
              <S.AddSpan onClick={handleUploadImg}>
                프로필 이미지 변경
              </S.AddSpan>
            )}

            <S.ImgInput
              ref={fileInput}
              type="file"
              onChange={(e) => onPreviewImg(e)}
            />
            <S.NicknameContainer>
              <Input
                label="닉네임"
                placeholder={initialNickname}
                {...register('nickName', {
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
            </S.NicknameContainer>
            <S.NicknameContainer>
              <Controller
                control={control}
                name="location"
                defaultValue=""
                rules={{ required: '주소를 입력해주세요.' }}
                render={({ field }) => (
                  <Input
                    label="주소정보 입력"
                    placeholder={initialLocation}
                    {...field}
                    readOnly
                  />
                )}
              />
              <SearchLocation setValue={setValue} trigger={trigger} />
            </S.NicknameContainer>
            {isValid ? (
              <S.ActiveSaveButton disabled={isLoading}>
                {isLoading ? <Loader /> : '저장하기'}
              </S.ActiveSaveButton>
            ) : (
              <S.InactiveSaveButton disabled>저장하기</S.InactiveSaveButton>
            )}
          </S.Form>

          {showModal && alertMessage && (
            <AlertModal
              title="프로필 수정 오류"
              confirmType="warning"
              message={alertMessage}
              onConfirm={() => navigate('/mypage')}
            />
          )}
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default EditProfilePage;
