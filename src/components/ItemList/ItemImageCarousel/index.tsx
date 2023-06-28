import { useState, ReactNode } from 'react';

import * as S from './styles';

import mockImg1 from '../../../assets/imgs/mock/간식1-1.jpeg';
import mockImg2 from '../../../assets/imgs/mock/간식1-2.jpeg';
import mockImg3 from '../../../assets/imgs/mock/간식1-3.jpeg';
import mockImg4 from '../../../assets/imgs/mock/간식1-4.jpeg';
import mockImg5 from '../../../assets/imgs/mock/간식2-1.jpeg';
import mockImg6 from '../../../assets/imgs/mock/간식2-2.jpeg';
import mockImg7 from '../../../assets/imgs/mock/간식2-3.jpeg';
import mockImg8 from '../../../assets/imgs/mock/장난감1-1.jpeg';
import mockImg9 from '../../../assets/imgs/mock/장난감1-3.jpeg';
import mockImg10 from '../../../assets/imgs/mock/장난감1-4.jpeg';
import mockImg11 from '../../../assets/imgs/mock/장난감1-5.jpeg';
import mockImg12 from '../../../assets/imgs/mock/강아지.webp';
import mockImg13 from '../../../assets/imgs/mock/강아지2.webp';
import mockImg14 from '../../../assets/imgs/mock/강아지3.webp';
import mockImg15 from '../../../assets/imgs/mock/강아지4.webp';


interface CarouselProps {
  size: number;
  images: string[];
}

const IMG_WIDTH = 158;

const ItemImageCarousel = ({size, images} : CarouselProps) => {
  const [curIdx, setCurIdx] = useState(0);
  const [curPosition, setCurPosition] = useState(0);

  // console.log(`curIdx: ${curIdx} size: ${size}, position: ${curPosition}`);

  const imageList: ReactNode[] = [];
  images.forEach((imgUrl, idx) => {
    if (idx % 4 === 0){
      imageList.push(
        <S.ImageContainer key={idx}>
          <S.Image src={mockImg12 as string} width={IMG_WIDTH}/>
        </S.ImageContainer>
      );
    } else if (idx % 4 === 1){
      imageList.push(
        <S.ImageContainer key={idx}>
          <S.Image src={mockImg15 as string} width={IMG_WIDTH}/>
        </S.ImageContainer>
      );
    } else if (idx % 4 === 2){
      imageList.push(
        <S.ImageContainer key={idx}>
          <S.Image src={mockImg14 as string} width={IMG_WIDTH}/>
        </S.ImageContainer>
      );
    } else if (idx % 4 === 3){
      imageList.push(
        <S.ImageContainer key={idx}>
          <S.Image src={mockImg13 as string} width={IMG_WIDTH}/>
        </S.ImageContainer>
      );
    }
  });

  const showPrevImage = () => {
    setCurIdx(curIdx - 1);
    setCurPosition(curPosition + IMG_WIDTH);
  };

  const showNextImage = () => {
    setCurIdx(curIdx + 1);
    setCurPosition(curPosition - IMG_WIDTH);
  };

  return (
    <S.Container>
      <S.Window position={curPosition} length={size} width={IMG_WIDTH} >
        {imageList}
      </S.Window>

      {curIdx !== 0 && <S.PrevButton onClick={showPrevImage} />}
      {curIdx !== size - 2 && <S.NextButton onClick={showNextImage} />}
    </S.Container>
  );
};

export default ItemImageCarousel;