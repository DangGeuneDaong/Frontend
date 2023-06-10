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
  readOnly?: boolean;
  style?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input(
  {
    width,
    height,
    size,
    direction,
    type,
    name,
    label,
    inputDescription,
    placeholder,
    errors,
    readOnly,
    style,
    onKeyDown,
    onKeyUp,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <S.InputContainer direction={direction}>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}
      {inputDescription && (
        <S.InputDescription>{inputDescription}</S.InputDescription>
      )}
      <div>
        <S.Input
          id={name}
          name={name}
          type={type}
          className={errorKEY && 'error'}
          placeholder={placeholder}
          spellCheck="false"
          autoComplete="off"
          ref={ref}
          style={style}
          readOnly={readOnly}
          focusStyle
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          {...rest}
        />
      </div>
      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default forwardRef(Input);
