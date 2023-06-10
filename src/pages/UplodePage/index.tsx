import { useEffect, useState } from 'react';
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
    watch, // 실시간 값 감시 가능
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
    const postData = {
      // id : postID(autoIncrease 확인)
      // user_id : userID
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

    console.log(data);
    console.log(postData);

    await fetch('/post', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const { mutate } = useMutation(addPost, {
    onSuccess: () => {
      console.log('성공');
    },

    onError: (error: any) => {
      console.log(error);

      console.log(typeof error);

      if (error.response && error.response.status === 401) {
        // 로그인 페이지로 이동
      }
    },
  });

  const onSubmit = async (data: any) => {
    // TODO : 폼 전송 클릭 시, 로그인 된 유저가 아닐 경우 로그인 페이지로 이동
    mutate(data);
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
