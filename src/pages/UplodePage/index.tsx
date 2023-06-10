import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import MainTemplate from '../../components/template/MainTemplate';

import * as S from './UplodePage.styles';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Form/Textarea';
import Hashtag from '../../components/Hashtag';
import Dropdown from '../../components/Dropdown';

export interface UplodePageCSSProps {
  inputContainerDirection?: 'row' | 'column';
}

function UplodePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');

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

  // 엔터 입력 시 다른 폼으로 넘어가지 않도록 방지
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 태그 입력 시 태그 추가
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputTag = watch('hashtag');
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

    // 엔터, 스페이스바, 콤마 입력 시 태그 추가
    const allowEventKey =
      inputTag !== '' &&
      (e.key === 'Enter' || inputTag.endsWith(' ') || inputTag.endsWith(','));

    // 특수문자 입력 시 에러, 입력해도 배열에 추가되지 않음
    if (regExp.test(inputTag)) {
      setError('hashtag', {
        type: 'validate',
        message: '태그는 한글, 영문, 숫자로 이루어진 10자 이하의 문자열입니다.',
      });
      return;
    }

    // 태그 추가
    if (inputTag !== '' && allowEventKey) {
      let trimmedTag = inputTag.trim();

      if (trimmedTag.endsWith(',')) {
        trimmedTag = trimmedTag.slice(0, -1);
      }

      !tags.includes(trimmedTag) && setTags([...tags, trimmedTag]);

      setValue('hashtag', '');
      setFocus('hashtag');
    }
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <MainTemplate>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
          <S.Inner>
            {/* 이미지 등록 컨테이너 */}
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
                errors={errors}
                style={{ borderRadius: '4px', margin: '0' }}
                {...register('description', {
                  required: '내용을 입력해주세요',
                })}
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
                    onDelete={() => console.log('delete')}
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
