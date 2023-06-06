import { Oval } from 'react-loader-spinner';
import { useTheme } from 'styled-components';

import * as S from './Loader.styles';

export interface LoaderCSSProps {
  // loader dimmed layer color
  // default: transparent / white / black
  bgColor?: string;
}

interface LoaderProps extends LoaderCSSProps {
  width?: number;
  height?: number;
}

function Loader({ width = 40, height = 40, bgColor }: LoaderProps) {
  const theme = useTheme();

  return (
    <S.LoaderContainer>
      <Oval
        width={width}
        height={height}
        color={theme.color.primary}
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={theme.color.lightPrimary}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </S.LoaderContainer>
  );
}

export default Loader;
