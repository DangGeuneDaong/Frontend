import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import { addTag, deleteTag } from '../../utils/hashtag';

import MainTemplate from '../../components/template/MainTemplate';

import * as S from './styles';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Form/Textarea';
import Hashtag from '../../components/Hashtag';
import Dropdown from '../../components/Dropdown';
import MultiUploader from '../../components/FileUploader/MultiUploader';

export interface UplodePageCSSProps {
  inputContainerDirection?: 'row' | 'column';
}

function UplodePage() {
  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setFocus,
    setError,
    watch,
  } = useForm({ mode: 'onBlur' });

  // 디버깅용 코드
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    console.log('태그', tags);
  }, [tags]);

  useEffect(() => {
    console.log('선택된 파일', selectedFiles);
  }, [selectedFiles]);

  // 엔터 입력 시 다른 폼으로 넘어가지 않도록 방지
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 태그 추가
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputTag = watch('hashtag');
    const newTags = addTag(tags, inputTag, e, setValue, setFocus, setError);
    setTags(newTags);
  };

  // 태그 삭제 버튼 클릭 시 태그 삭제
  const handleTagDelete = (tag: string) => {
    setTags(deleteTag(tags, tag));
  };

  // 폼 전송
  const addPost = async (data: any) => {
    try {
      const response = await fetch('/good/offer/info', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      switch (response.status) {
        // 400 (Bad Request) 401 (Unauthorized) 404 (Not Found) 500 (Internal Server Error)
        case 400:
        case 404:
          throw new Error('API 요청에 실패했습니다.');
        case 401:
          // TODO : 비 로그인 유저일 때, 확인 알럿 띄우고 로그인 페이지로 이동
          throw new Error('로그인이 필요합니다.');
        case 500:
          throw new Error('서버에 오류가 발생했습니다.');
        default:
          // api 요청 성공했을 때 실행 로직
          return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(addPost);

  const onSubmit = async (data: any) => {
    const postData = {
      // user_id : userID 로그인 시 recoil state에서 가져오기
      main_category: selectedCategory,
      sub_category: selectedProduct,
      title: data.title,
      description: data.description,
      // latitude : 위도
      // longitude :  경도
      status: '판매중',
      good_image_list: selectedFiles,
      view_cnt: 0,
      created_at: new Date(),
      modified_at: new Date(),
      hashtag: tags,
    };

    mutate(postData);
  };

  return (
    <MainTemplate>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
          <S.Inner>
            {/* 이미지 등록 컨테이너 */}
            <div style={{ marginBottom: '20px' }}>
              <MultiUploader
                onSelectItem={(files) => setSelectedFiles(files)}
              />
            </div>

            {/* 카테고리 선택 */}
            <S.InputContainer inputContainerDirection="row">
              <S.Title>카테고리</S.Title>
              <S.DropdownContainer>
                <Dropdown
                  listData={['강아지', '고양이']}
                  selectedItem={selectedCategory}
                  onSelectItem={(item) => setSelectedCategory(item)}
                ></Dropdown>
              </S.DropdownContainer>

              <S.DropdownContainer>
                <Dropdown
                  listData={['사료', '간식', '용품']}
                  selectedItem={selectedProduct}
                  onSelectItem={(item) => setSelectedProduct(item)}
                ></Dropdown>
              </S.DropdownContainer>
            </S.InputContainer>

            {/* 제목 입력 */}
            <S.InputContainer>
              <Input
                type="text"
                label="제목 *"
                containerType="content"
                errors={errors}
                style={{ borderRadius: '4px', margin: '0', maxWidth: '656px' }}
                {...register('title', {
                  required: '제목을 입력해주세요',
                })}
              />
            </S.InputContainer>

            {/* 내용 입력 */}
            <S.InputContainer>
              <Textarea
                label="제품정보 *"
                containerType="content"
                errors={errors}
                style={{ borderRadius: '4px', margin: '0' }}
                {...register('description', {
                  required: '내용을 입력해주세요',
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setValue('description', `${watch('description')}\n`);
                  }
                }}
              ></Textarea>
            </S.InputContainer>

            {/* 해시태그 입력 */}
            <S.InputContainer>
              <S.Title>해시태그</S.Title>

              <S.HashtagContainer>
                {tags.map((tag, index) => (
                  <Hashtag
                    tag={tag}
                    key={index}
                    onDelete={() => handleTagDelete(tag)}
                  ></Hashtag>
                ))}
              </S.HashtagContainer>

              <Input
                type="text"
                errors={errors}
                style={{ borderRadius: '4px', margin: '0' }}
                onKeyUp={handleKeyUp}
                {...register('hashtag')}
              />
            </S.InputContainer>

            <S.ButtonContainer>
              <Button
                type="button"
                styleType="warning"
                width="128px"
                borderRadius="20px"
                onClickHandler={() => console.log('취소')}
              >
                취소
              </Button>

              <Button width="128px" borderRadius="20px">
                완료
              </Button>
            </S.ButtonContainer>
          </S.Inner>
        </form>
      </S.Container>
    </MainTemplate>
  );
}

export default UplodePage;
