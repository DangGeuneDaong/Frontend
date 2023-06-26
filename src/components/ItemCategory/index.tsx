import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import food from '../../assets/imgs/pet-food.png';
import snack from '../../assets/imgs/pet-snack.png';
import supply from '../../assets/imgs/pet-supply.png';

import * as S from './styles';

interface ItemCategoryProps {
  onSelectCategory: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const ItemCategory = ({ onSelectCategory, setPage }: ItemCategoryProps) => {
  const selectCategory = (e: ChangeEvent<HTMLFormElement>) => {
    onSelectCategory(e.target.value);
    setPage(1);
  };

  return (
    <S.Container onChange={selectCategory}>
      <S.Category type='radio' id='all' name='category' value='all' defaultChecked/>
      <S.CategoryLabel htmlFor='all'>전체</S.CategoryLabel>
      <S.Category type='radio' id='food' name='category' value='food' />
      <S.CategoryLabel htmlFor='food'><S.CategoryImg src={food} alt='사료'/>사료</S.CategoryLabel>
      <S.Category type='radio' id='snack' name='category' value='snack' />
      <S.CategoryLabel htmlFor='snack'><S.CategoryImg src={snack} alt='간식'/>간식</S.CategoryLabel>
      <S.Category type='radio' id='supply' name='category' value='supply' />
      <S.CategoryLabel htmlFor='supply'><S.CategoryImg src={supply} alt='간식'/>용품</S.CategoryLabel>
    </S.Container>
  );
};

export default ItemCategory;
