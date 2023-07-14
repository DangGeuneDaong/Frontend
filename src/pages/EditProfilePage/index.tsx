import { useForm, Controller } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../states/userInfo';

import MainTemplate from '../../components/template/MainTemplate';
import Input from '../../components/Form/Input';
import Loader from '../../components/Loader';
import SearchLocation from '../../components/SearchLocation';
import AlertModal from '../../components/Modal/Alert';

import * as S from './styles';

export interface EditProfilePageProps {
  nickName: string;
  location: string;
}

function EditProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // const [thumbnail, setThumbnail] = useState<string>(userInfo.profileUrl);
  // const [profileFile, setProfileFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const { handleInfoSubmit, isLoading, error, alertMessage, showModal } =
    useAuth();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
  } = useForm<EditProfilePageProps>({
    mode: 'onBlur',
    defaultValues: {
      nickName: userInfo.nickName,
      location: userInfo.location,
    },
  });

  // //프로필 사진 미리보기
  // const onPreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     //file => URL
  //     setProfileFile(file);
  //     const url = URL.createObjectURL(file);
  //     setThumbnail(url);
  //   }
  // };
  // const resetImg = () => {
  //   if (fileInput.current) {
  //     fileInput.current.value = '';
  //   }
  //   setProfileFile(null);
  //   setThumbnail(userInfo.profileUrl);
  // };

  const handleProfileSubmit = async (data: EditProfilePageProps) => {
    const errorMsg = await handleInfoSubmit(data);
    if (errorMsg) {
      setError('nickName', { type: 'manual', message: errorMsg });
    } else {
      navigate('/');
    }
  };

  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>프로필 수정</S.H1>
          <S.Form onSubmit={handleSubmit((data) => handleProfileSubmit(data))}>
            {userInfo.profileUrl ? (
              //   <S.ProfileImg src={thumbnail} alt="유저 프로필 이미지" />
              // ) : (
              <S.ProfileImg
                src={userInfo.profileUrl}
                alt="유저 프로필 이미지"
              />
            ) : (
              <S.ProfileImg
                src={
                  'https://www.thechooeok.com/common/img/default_profile.png'
                }
                alt="유저 프로필 이미지"
              />
            )}
            {/* {thumbnail !== userInfo.profileUrl ? (
              <S.CancelButton onClick={resetImg}>
                프로필 이미지 변경 취소
              </S.CancelButton>
            ) : (
              <S.AddSpan onClick={() => fileInput.current?.click()}>
                프로필 이미지 변경
              </S.AddSpan>
            )}
            <S.ImgInput
              ref={fileInput}
              type="file"
              onChange={(e) => onPreviewImg(e)}
            /> */}
            <Input
              label="닉네임"
              placeholder={userInfo.nickName}
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
            <S.NicknameContainer>
              <Controller
                control={control}
                name="location"
                rules={{ required: '주소를 입력해주세요.' }}
                render={({ field }) => (
                  <Input
                    label="주소정보 입력"
                    placeholder={userInfo.location}
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
