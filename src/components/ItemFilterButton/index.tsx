import { Dispatch, SetStateAction } from 'react';

import filterImg from '../../assets/imgs/filter-icon.png';
import * as S from './styles';

interface ItemFilterButtonProps {
  isActive: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}

const ItemFilterButton = (props : ItemFilterButtonProps) => {
  return (
    <S.ItemFilterButton type='button' $isFocus={props.isActive} onClick={() => props.onClick(!props.isActive)} >
      <S.ItemFilterButtonImg src={filterImg} />
    </S.ItemFilterButton>
  );
};

export default ItemFilterButton;