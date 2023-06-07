import styled, { css } from 'styled-components';
import { InputCSSProps } from './Input';

const handleInputSize: any = (props: InputCSSProps) => {
  switch (props.size) {
    case 'sm':
      return css`
        ${Input} {
          height: 36px;
          font-size: 14px;
          padding: 10px;
        }
        ${Textarea} {
          height: 172px;
          font-size: 14px;
        }
        ${InputLabel} {
          ${(props) => props.theme.font.heading_sm};
        }
      `;
    case 'md':
      return css`
        ${Input} {
          height: 45px;
          font-size: 16px;
          padding: 10px;
        }
        ${InputLabel} {
          ${(props) => props.theme.font.heading_sm};
        }
      `;
    case 'lg':
      return css`
        ${Input} {
          height: 72px;
          font-size: 20px;
          padding: 24px 20px;
        }
        ${InputLabel} {
          ${(props) => props.theme.font.heading_md};
        }
      `;
    default:
      return css`
        ${Input} {
          height: 36px;
          font-size: 14px;
          padding: 10px;
        }
        ${Textarea} {
          height: 172px;
          font-size: 14px;
        }
        ${InputLabel} {
          ${(props) => props.theme.font.heading_sm};
        }
      `;
  }
};

const InputContainer = styled.div<InputCSSProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.width || '100%'};
  margin-bottom: 24px;

  ${(props) => handleInputSize(props)}
`;

const InputLabel = styled.label<InputCSSProps>`
  margin-bottom: 5px;
`;

const commonInputStyle = css<InputCSSProps>`
  width: 100%;
  border: 0;
  font: inherit;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color.lightGray};

  &::placeholder {
    color: rgba(128, 128, 128, 0.9);
  }

  ${(props) =>
    props.focusStyle &&
    css`
      :focus-within {
        border: 1px solid ${(props) => props.theme.color.primary};
      }
    `}
`;

const InputDescription = styled.p`
  font-size: 14px;
  margin-top: -4px;
  margin-bottom: 5px;
`;

const Input = styled.input<InputCSSProps>`
  ${commonInputStyle}
  max-width: ${(props) => props.width || '100%'};
`;

const Textarea = styled.textarea<InputCSSProps>`
  ${commonInputStyle}
  padding: 10px;
  resize: none;
  overflow-y: scroll;
  overflow-y: overlay;

  &::placeholder {
    white-space: pre-wrap;
  }
`;

// 체크박스
const CheckboxContainer = styled.div<InputCSSProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 326px;
  gap: 10px 22px;
`;

const CheckBox = styled.div``;

const InputCheckbox = styled.input`
  display: none;

  & + label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94px;
    height: 40px;
    background-color: #f8f8f9;
    border-radius: 10px;
    cursor: pointer;
  }

  &:checked + label {
    border: 1px solid ${(props) => props.theme.color.primary};
    background-color: ${(props) => props.theme.color.lightPrimary};
  }
`;

// 라디오 버튼
const RadioContainer = styled.div`
  display: flex;
  align-checkbox: center;
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
`;

const InputRadio = styled.input`
  display: none;

  & + label {
    display: inline-flex;
    align-items: center;
  }

  &:checked + label span {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z' fill='rgba(248,191,82,1)'%3E%3C/path%3E%3C/svg%3E");
  }
`;

const InputRadioIcon = styled.span<InputCSSProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: -2px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z' fill='rgba(216,216,216,1)'%3E%3C/path%3E%3C/svg%3E");
  margin-right: 8px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

// 기타 입력(인풋 단위)
const InputErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${(props) => props.theme.color.red};
`;

export default {
  InputContainer,
  InputLabel,
  InputDescription,
  Input,
  RadioContainer,
  RadioBox,
  InputRadio,
  InputRadioIcon,
  CheckboxContainer,
  CheckBox,
  InputCheckbox,
  Textarea,
  InputErrorMessage,
};
