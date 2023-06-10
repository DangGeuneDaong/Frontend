import { forwardRef } from 'react';

import * as S from '../styles';

export interface InputCSSProps {
  width?: string;
  height?: string;
  size?: string; // default:md, sm, md, lg
  direction?: string; // default:column, row
  inputDescription?: string; // input 제목 하단 설명
  focusStyle?: boolean; // 클릭 시 input 포커스 스타일 적용
  containerType?: string; // optional : content
}

interface InputProps extends InputCSSProps {
  type?: string; // text:default, password, number, email, tel, url, search
  name?: string; // label 클릭 시 input 포커스
  placeholder?: string; // placeholder
  label?: string; // input 이름
  errors?: any;
  style?: React.CSSProperties;
}

function Textarea(
  {
    size,
    direction,
    containerType,
    name,
    label,
    inputDescription,
    placeholder,
    errors,
    style,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <S.InputContainer direction={direction} containerType={containerType}>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}
      {inputDescription && (
        <S.InputDescription>{inputDescription}</S.InputDescription>
      )}
      <S.Textarea
        id={name}
        name={name}
        className={errorKEY && 'error'}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete="off"
        ref={ref}
        style={style}
        focusStyle
        {...rest}
      />
      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default forwardRef(Textarea);
