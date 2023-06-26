import * as S from './styles';

export interface ButtonCSSProps {
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입, default: submit
  styleType?: 'primary' | 'warning' | 'disabled'; // 버튼 디자인 타입, default: primary
  width?: string; // 버튼 너비, 지정하지 않을 경우 full width
  height?: string; // 버튼 높이, default: 40px
  inverted?: boolean; // 버튼 색상 반전, default: false, true 일때 outline 스타일,
  borderRadius?: string; // 버튼 둥글기, default: 0, ex) 5px, 10px
  borderWidth?: string; // 버튼 테두리 두께, default: 1px, ex) 1px, 2px
  hoverStyle?: string; // 'border:1px solid #000' 과 같이 hoverStyle 지정
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
  hoverStyle,
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
      hoverStyle={hoverStyle}
      style={style}
      inverted={inverted}
    >
      {children}
    </S.Button>
  );
}

export default Button;
