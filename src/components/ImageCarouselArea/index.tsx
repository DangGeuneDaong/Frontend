import { useState } from 'react';

import * as S from './styles';

interface ImageCarouselProps {
  image: string;
}
interface ConfigProps {
  config: string[];
}

function ImageCarouselArea({ config }: ConfigProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const next = () => {
    setImageIndex((state) => (state += 1));
    if (imageIndex === config.length - 1) setImageIndex(0);
  };

  const prev = () => {
    setImageIndex((state) => (state -= 1));
    if (imageIndex === 0) setImageIndex(config.length - 1);
  };

  return (
    <S.Container>
      <S.ImageContainer src={config[imageIndex]} />
      <S.Button right onClick={next}>
        ▶
      </S.Button>
      <S.Button onClick={prev}>◀</S.Button>
      <S.DotContainer>
        {config.map((dot, index) => (
          <S.Dot key={dot} active={index === imageIndex} />
        ))}
      </S.DotContainer>
    </S.Container>
  );
}

export default ImageCarouselArea;
