import styled from 'styled-components';

// AiOutlineLeft (왼쪽 버튼)
import leftArrow from '../../../assets/imgs/left.png';

// AiOutlineRight (오른쪽 버튼)
import rightArrow from '../../../assets/imgs/right.png';

interface WindowProps {
  position: number | undefined;
  length: number;
  width: number;
}

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  height: 158px;
  line-height: 158px;
  text-align: center;
  /* border: 1px solid rgba(0,0,0, 0.1); */
  /* border-radius: 8px; */
`;

export const Window = styled.div<WindowProps>`
  display: flex;
  gap: 4px;
  width: ${props => (props.length * props.width)+'px'};
  transform: translateX(${props => props.position}px);

  transition: all 0.2s;
`;

export const ImageContainer = styled.div`
  width: 158px;
  height: 158px;
`;

export const Image = styled.img`
  width: ${props => props.width+'px'};
  height: 158px;
  border-radius: 6px;
`;

export const PrevButton = styled.button`
  position: absolute;
  top: 45%;
  left: 4px;
  background: url(${leftArrow}) no-repeat;
  background-color: rgba(255, 255, 255, 0.7);
  background-size: contain;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(253, 248, 216, 0.2);
  border-radius: 50%;
  cursor: pointer;
`;

export const NextButton = styled.button`
  position: absolute;
  top: 45%;
  right: 4px;
  background: url(${rightArrow}) no-repeat;
  background-size: contain;
  background-color: rgba(255, 255, 255, 0.7);
  width: 20px;
  height: 20px;
  border: 1px solid rgba(253, 248, 216, 0.2);
  border-radius: 50%;
  cursor: pointer;
`;
