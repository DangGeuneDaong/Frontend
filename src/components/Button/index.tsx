import * as S from './Button.styles';

export interface ButtonCSSProps {
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입
  styleType?: 'primary' | 'warning' | 'disabled'; // 버튼 디자인 타입
  width?: string; // 버튼 너비, 지정하지 않을 경우 full width
  height?: string; // 버튼 높이, default: 40px
  inverted?: boolean; // 버튼 색상 반전, true 일때 outline 스타일
  borderRadius?: string; // 버튼 둥글기, ex) 5px, 10px
  borderWidth?: string; // 버튼 테두리 두께, ex) 1px, 2px
}

interface ButtonProps extends ButtonCSSProps {
  children: React.ReactNode;
  style?: React.CSSProperties; // 현재 디자인 시스템에 button size가 한 가지이므로, 필요한 경우 사용
  onClickHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  children,
  type = 'submit',
  styleType = 'primary',
  width,
  height,
  inverted,
  borderRadius,
  borderWidth,
  onClickHandler,
  style,
}: ButtonProps) {
  return (
    <S.Button
      type={type}
      styleType={styleType}
      width={width}
      height={height}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      onClick={onClickHandler}
      style={style}
      inverted={inverted}
    >
      {children}
    </S.Button>
  );
}

export default Button;
