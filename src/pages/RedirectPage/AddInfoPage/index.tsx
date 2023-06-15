import { useForm, Controller } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import MainTemplate from '../../../components/template/MainTemplate';
import Input from '../../../components/Form/Input';
import Loader from '../../../components/Loader';
//import SearchLocation from '../../components/Join/SearchLocation';

import * as S from './styles';

interface AddInfoProps {
  nickname: string;
  location: string;
  profile_url: string;
}

function AddInfoPage() {
  const [imgFile, setImgFile] = useState<string>(
    'https://www.thechooeok.com/common/img/default_profile.png'
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
  } = useForm<AddInfoProps>({ mode: 'onBlur' });

  const handleInfoSubmit = async (data: AddInfoProps) => {
    try {
      await axios.post('/guest', data);
    } catch (error) {
      setError('nickname', { message: '추가 정보 저장에 실패했습니다' });
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
  const onPreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];

    if (file) {
      reader.readAsDataURL(file); //file => URL

      // 읽기 동작이 성공적으로 완료 되었을 시 실행
      reader.onload = () => {
        if (reader.result) {
          setImgFile(reader.result.toString());
        }
      };
    }
  };
  //랜덤 닉네임을 다시 가져오는 함수 아직 미정!
  const handleRefreshNickname = async () => {
    try {
      const response = await axios.get('/미정');
      const data = response.data;
      const newRandomNickname = data.nickname;
      setValue('nickname', newRandomNickname);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const resetImg = () => {
    setImgFile('https://www.thechooeok.com/common/img/default_profile.png');
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.H1>추가 정보 입력</S.H1>
          <S.Form onSubmit={handleSubmit(handleInfoSubmit)}>
            <S.ProfileImg src={imgFile} />
            {imgFile !==
            'https://www.thechooeok.com/common/img/default_profile.png' ? (
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
              accept="image/*"
              onChange={(e) => onPreviewImg(e)}
            />
            <S.NicknameContainer>
              <Input
                label="닉네임"
                placeholder={'닉네임 입력'}
                {...register('nickname', {
                  required: '닉네임은 필수 입력입니다.',
                })}
                errors={errors}
              />
              <S.RefreshButton onClick={handleRefreshNickname}>
                🔁
              </S.RefreshButton>
            </S.NicknameContainer>

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
            {/* <SearchLocation setValue={setValue} /> */}
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
