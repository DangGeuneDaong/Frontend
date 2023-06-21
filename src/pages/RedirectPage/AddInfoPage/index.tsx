import { useForm, Controller } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import MainTemplate from '../../../components/template/MainTemplate';
import Input from '../../../components/Form/Input';
import Loader from '../../../components/Loader';
import SearchLocation from '../../../components/Join/SearchLocation';

import * as S from './styles';

export interface AddInfoProps {
  nickname: string;
  location: string;
  profile_url: string;
}
const DEFAULT_PROFILE_URL =
  'https://www.thechooeok.com/common/img/default_profile.png';
const randomAdjective = [
  '멍때리는',
  '건방진',
  '잠자는',
  '신난',
  '드러누운',
  '밥먹는',
  '코딩하는',
  '삐진',
  '귀여운',
];
const randomNicknames = [
  '프로도',
  '라이언',
  '어피치',
  '네오',
  '춘식',
  '튜브',
  '콘',
  '무지',
  '제이지',
];
//랜덤닉네임 함수
function generateRandomNickname() {
  const randomAdjectiveValue =
    randomAdjective[Math.floor(Math.random() * randomAdjective.length)];
  const randomNicknameValue =
    randomNicknames[Math.floor(Math.random() * randomNicknames.length)];

  return `${randomAdjectiveValue} ${randomNicknameValue}`;
}
function AddInfoPage({ accessToken }: { accessToken: string | null }) {
  const initialNickname = generateRandomNickname();
  const [nicknameEdited, setNicknameEdited] = useState<boolean>(false);
  const [randomNickname, setRandomNickname] = useState<string>(initialNickname);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<AddInfoProps>({
    mode: 'onBlur',
    defaultValues: {
      nickname: initialNickname,
      location: '',
      profile_url: 'https://www.thechooeok.com/common/img/default_profile.png',
    },
  });
  const watchProfileUrl = watch('profile_url');

  const handleInfoSubmit = async (data: AddInfoProps) => {
    try {
      await axios.post('/guest', {
        ...data,
        profile_url: watchProfileUrl,
        access_token: accessToken,
      });
    } catch (error) {
      setError('nickname', { message: '닉네임이 중복되었습니다.' });
    }
  };

  const queryClient = useQueryClient();
  const { isLoading } = useMutation(handleInfoSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries('additional-info');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //프로필 사진 미리보기
  // const createImageURL = (fileBlob) => {  // createObjectURL 방식
  //   if (URLThumbnail) URL.revokeObjectURL(URLThumbnail);

  //   setURLThumbnail(url);
  // };
  const onPreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      // reader.readAsDataURL(file); //file => URL
      const url = URL.createObjectURL(file);
      setValue('profile_url', url);

      // 읽기 동작이 성공적으로 완료 되었을 시 실행
      reader.onload = () => {
        if (reader.result) {
        }
      };
    }
  };
  //랜덤 닉네임
  const handleRefreshNickname = async () => {
    if (!nicknameEdited) {
      const newRandomNickname = await generateRandomNickname();
      setRandomNickname(newRandomNickname);
      setValue('nickname', newRandomNickname);
    }
  };
  const handleUploadImg = () => {
    fileInput.current?.click();
  };
  const resetImg = () => {
    setValue('profile_url', DEFAULT_PROFILE_URL);
    fileInput.current?.value && (fileInput.current.value = '');
  };
  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>추가 정보 입력</S.H1>
          <S.Form onSubmit={handleSubmit(handleInfoSubmit)}>
            <S.ProfileImg src={watchProfileUrl} />
            {watchProfileUrl !== DEFAULT_PROFILE_URL ? (
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
              <Controller
                control={control}
                name="nickname"
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
              <SearchLocation setValue={setValue} />
            </S.NicknameContainer>
            {isValid ? (
              <S.ActiveSaveButton disabled={isLoading}>
                {isLoading ? <Loader /> : '저장하기'}
              </S.ActiveSaveButton>
            ) : (
              <S.InactiveSaveButton disabled>저장하기</S.InactiveSaveButton>
            )}
          </S.Form>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default AddInfoPage;
