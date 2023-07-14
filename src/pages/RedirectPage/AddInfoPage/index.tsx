import { useForm, Controller } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRandom } from '../../../hooks/useRandom';
import { useLocation, useNavigate } from 'react-router-dom';

import MainTemplate from '../../../components/template/MainTemplate';
import Input from '../../../components/Form/Input';
import Loader from '../../../components/Loader';
import SearchLocation from '../../../components/SearchLocation';
import AlertModal from '../../../components/Modal/Alert';

import * as S from './styles';

export interface AddInfoProps {
  nickName: string;
  location: string;
}

function AddInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loginType = params.get('loginType');
  const { getSocialUserProfile } = useAuth();
  const { generateRandomNicknameK, generateRandomNicknameN } = useRandom();
  const initialNickname =
    loginType === 'kakao'
      ? generateRandomNicknameK()
      : generateRandomNicknameN();
  const [nicknameEdited, setNicknameEdited] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [randomNickname, setRandomNickname] = useState<string>(initialNickname);
  const [initialProfile, setInitialProfile] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
  const { handleInfoSubmit, isLoading, error, alertMessage, showModal } =
    useAuth();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<AddInfoProps>({
    mode: 'onBlur',
    defaultValues: {
      nickName: initialNickname,
      location: '',
    },
  });
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getSocialUserProfile(accessToken)
        .then((socialUserData) => {
          setInitialProfile(socialUserData.profileUrl);
          setThumbnail(socialUserData.profileUrl);
        })
        .catch((error) => console.error('콘솔에러', error));
    }
  }, [setValue]);

  //프로필 사진 미리보기
  const onPreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //file => URL
      setProfileFile(file);
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
  };
  //랜덤 닉네임
  const handleRefreshNickname = async () => {
    if (!nicknameEdited) {
      const newRandomNickname =
        loginType === 'kakao'
          ? generateRandomNicknameK()
          : generateRandomNicknameN();
      setRandomNickname(newRandomNickname);
      setValue('nickName', newRandomNickname);
    }
  };
  const resetImg = () => {
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    setProfileFile(null);
    setThumbnail(initialProfile);
  };
  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>추가 정보 입력</S.H1>
          <S.Form onSubmit={handleSubmit((data) => handleInfoSubmit(data))}>
            {thumbnail ? (
              <S.ProfileImg src={thumbnail} alt="유저 프로필 이미지" />
            ) : (
              <S.ProfileImg src={initialProfile} alt="유저 프로필 이미지" />
            )}
            {/* {thumbnail !== initialProfile ? (
              <S.CancelButton onClick={resetImg}>
                프로필 이미지 변경 취소
              </S.CancelButton>
            ) : (
              <S.AddSpan onClick={() => fileInput.current?.click()}>
                프로필 이미지 변경
              </S.AddSpan>
            )} */}

            {/* <S.ImgInput
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={(e) => onPreviewImg(e)}
            /> */}
            <S.NicknameContainer>
              <Controller
                control={control}
                name="nickName"
                defaultValue=""
                rules={{ required: '닉네임은 필수 입력입니다.' }}
                render={({ field }) => (
                  <Input
                    label="닉네임"
                    placeholder={randomNickname}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setNicknameEdited(true);
                    }}
                    readOnly={false}
                    errors={errors}
                  />
                )}
              />
              <S.RefreshButton onClick={handleRefreshNickname}>
                🔁
              </S.RefreshButton>
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
                    placeholder="주소 입력"
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
              title="추가정보 오류"
              confirmType="warning"
              message={alertMessage}
              onConfirm={() => navigate('/signin')}
            />
          )}
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default AddInfoPage;
