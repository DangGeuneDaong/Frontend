// 태그 등록
import { FieldError } from 'react-hook-form';

export function addTag(
  tags: string[],
  inputTag: string,
  event: React.KeyboardEvent<HTMLInputElement>,
  setValue: (field: string, value: any) => void,
  setFocus: (field: string) => void,
  setError: (field: string, error: FieldError) => void
): string[] {
  const regExp = /[{}[\]\/?.;:|)*~`!^\\_+<>@#$%&=('"-]/g;

  // 엔터, 스페이스바, 콤마 입력 시 태그 추가
  const allowEventKey =
    inputTag !== '' &&
    (event.key === 'Enter' || inputTag.endsWith(' ') || inputTag.endsWith(','));

  // 특수문자 입력 시 에러, 입력해도 배열에 추가되지 않음
  if (regExp.test(inputTag)) {
    setError('hashtag', {
      type: 'validate',
      message: '태그는 한글, 영문, 숫자로 이루어진 10자 이하의 문자열입니다.',
    });
    return tags;
  } else {
    setError('hashtag', {
      type: 'validate',
      message: '',
    });
  }

  // 태그 추가
  if (inputTag !== '' && allowEventKey) {
    let trimmedTag = inputTag.trim();

    if (trimmedTag.endsWith(',')) {
      trimmedTag = trimmedTag.slice(0, -1);
    }

    if (!tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setValue('hashtag', '');
      setFocus('hashtag');
      return newTags;
    }
  }

  return tags;
}

// 태그 삭제
export function deleteTag(tags: string[], tagToDelete: string): string[] {
  return tags.filter((tag) => tag !== tagToDelete);
}
