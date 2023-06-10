import { useEffect, useState } from 'react';
import * as S from './styles';

import { AiFillCamera, AiOutlineClose } from 'react-icons/ai';

interface MultiUploaderProps {
  onSelectItem: (files: File[]) => void;
}

function MultiUploader({ onSelectItem }: MultiUploaderProps) {
  const MAX_REGISTER_IMAGE_COUNT = 7; //최대 이미지 등록 개수
  const [imageList, setImageList] = useState<File[]>([]); //이미지 리스트

  // 상위 컴포넌트(이미지와 폼 데이터를 함께 보내는 컴포넌트)에 이미지 리스트를 전달
  useEffect(() => {
    onSelectItem(imageList);
  }, [imageList]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;

    if (files) {
      // MAX_RESISTER_IMAGE_COUNT 개수를 초과하면, 이미지 등록 불가
      if (files.length + imageList.length > MAX_REGISTER_IMAGE_COUNT) {
        // TODO : 알럿 띄우고, 최대 처리 개수 안 넘는 애들만 등록하기
        // TODO : alert()으로 처리하고 추후 모달로 대체
        alert('최대 이미지 등록 개수를 초과하였습니다.');
        return;
      }

      // 이미지 압축 라이브러리
      // ...

      // 여러 파일 올릴 때, 파일 정보를 imageList에 저장
      setImageList([...imageList, ...files]);
    }
  };

  const onClickFileDelete = (file: File) => {
    const filteredImageList = imageList.filter((image) => image !== file);
    setImageList(filteredImageList);
  };

  return (
    <S.FileUploaderContainer>
      {/* 파일 업로드 컨테이너 */}
      <S.FileUploaderWrapper>
        {/* 안내 메세지 */}
        <AiFillCamera className="cameraIcon" />
        <S.FileUploaderGuideText>이미지 등록</S.FileUploaderGuideText>
        <S.FileCountContainer>
          {imageList.length}/{MAX_REGISTER_IMAGE_COUNT}
        </S.FileCountContainer>

        {/* 파일 업로드 Input */}
        <S.FileUploaderLabel>
          <S.FileUploaderInput
            type="file"
            accept="image/*"
            onChange={(event) => handleFileUpload(event)}
            multiple
          />
        </S.FileUploaderLabel>
      </S.FileUploaderWrapper>

      {/* 파일 썸네일 컨테이너 */}
      {imageList.map((file, index) => (
        <S.ThumbnailContainer key={index}>
          {/* 파일 썸네일 */}
          <img src={URL.createObjectURL(file)} />

          {/* 파일 삭제 버튼 */}
          <S.DeleteRegisterImageButton
            type="button"
            onClick={() => onClickFileDelete(file)}
          >
            <AiOutlineClose />
          </S.DeleteRegisterImageButton>
        </S.ThumbnailContainer>
      ))}
    </S.FileUploaderContainer>
  );
}

export default MultiUploader;
