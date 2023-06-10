import { forwardRef } from 'react';

import * as S from '../styles';

export interface InputCSSProps {
  width?: string;
  height?: string;
  size?: string; // default:md, sm, md, lg
  direction?: string; // default:column, row
  inputDescription?: string; // input 제목 하단 설명
  focusStyle?: boolean; // 클릭 시 input 포커스 스타일 적용
}

interface InputProps extends InputCSSProps {
  type?: string; // text:default, password, number, email, tel, url, search
  name?: string; // label 클릭 시 input 포커스
  placeholder?: string; // placeholder
  label?: string; // input 이름
  errors?: any;
}

function Textarea(
  {
    size,
    direction,
    name,
    label,
    inputDescription,
    placeholder,
    errors,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <S.InputContainer direction={direction}>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}
      {inputDescription && (
        <S.InputDescription>{inputDescription}</S.InputDescription>
      )}
      <div>
        <S.Textarea
          id={name}
          name={name}
          className={errorKEY && 'error'}
          placeholder={placeholder}
          spellCheck="false"
          autoComplete="off"
          ref={ref}
          focusStyle
          {...rest}
        />
      </div>
      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default forwardRef(Textarea);
