import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import dogImg from '../../assets/imgs/dog.png';
import catImg from '../../assets/imgs/cat.png';

import * as S from './styles';

export interface ItemFilterProps {
  petType: string;
  status: string;
}

interface ItemFilterButtonProps {
  condition: ItemFilterProps;
  onClose: Dispatch<SetStateAction<boolean>>;
  onSelectFilter: Dispatch<SetStateAction<ItemFilterProps>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const ItemFilter = ({ condition, onClose, onSelectFilter, setPage } : ItemFilterButtonProps) => {
  const [petType, setPetType] = useState<string>(condition.petType);
  const [status, setStatus] = useState<string>(condition.status);

  const applyFilterHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    for (const data of formData) {
      if (data[0] === 'petType') {
        condition.petType = data[1].toString();
      } else {
        condition.status = data[1].toString();
      }
    }
    onSelectFilter({...condition});
    setPage(1);
    onClose(false);
  };

  return (
    <S.Container onSubmit={applyFilterHandler}>
      <S.FilterUI>
        나눔 물품 필터
        <S.CloseFilterButton type='button' onClick={() => onClose(false)}/>
      </S.FilterUI>
      <S.FilterSection>
        <S.FilterHeader>반려동물 유형 🐶🐱</S.FilterHeader>
        <S.PetTypeFilter>
          <S.PetType type='radio' id='allPetType' name='petType' value='all' checked={petType === 'all'} onChange={(e) => setPetType(e.target.value)}/>
          <S.PetTypeLabel htmlFor='allPetType'>전체</S.PetTypeLabel>
          <S.PetType type='radio' id='dog' name='petType' value='dog' checked={petType === 'dog'} onChange={(e) => setPetType(e.target.value)}/>
          <S.PetTypeLabel htmlFor='dog'>
            <S.TypeImg src={dogImg} alt='강아지'/>강아지
          </S.PetTypeLabel>
          <S.PetType type='radio' id='cat' name='petType' value='cat' checked={petType === 'cat'} onChange={(e) => setPetType(e.target.value)}/>
          <S.PetTypeLabel htmlFor='cat'>
            <S.TypeImg src={catImg} alt='강아지'/>고양이
          </S.PetTypeLabel>
        </S.PetTypeFilter>
        <S.FilterHeader>나눔 상태 🧑🏻‍🌾👩🏻‍🌾</S.FilterHeader>
        <S.StatusFilter>
          <S.Status type='radio' id='allStates' name='status' value='all' checked={status === 'all'} onChange={(e) => setStatus(e.target.value)}/>
          <S.StatusLabel htmlFor='allStates'>전체</S.StatusLabel>
          <S.Status type='radio' id='sharing' name='status' value='sharing' checked={status === 'sharing'} onChange={(e) => setStatus(e.target.value)}/>
          <S.StatusLabel htmlFor='sharing'>나눔중</S.StatusLabel>
        </S.StatusFilter>
        <S.SubmitButton type='submit'>적용</S.SubmitButton>
    </S.FilterSection>
    </S.Container>
  );
};

export default ItemFilter;