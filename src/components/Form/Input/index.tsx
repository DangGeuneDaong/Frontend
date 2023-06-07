import { forwardRef, ChangeEventHandler } from 'react';

import S from '../Form.styles';

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
  onChange?: ChangeEventHandler<HTMLInputElement>; //onChange handler
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
    onChange,
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
          onChange={onChange}
          ref={ref}
          focusStyle
          {...rest}
        />
      </div>
      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default forwardRef(Input);
