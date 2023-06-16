import { useState } from 'react';

import ItemSearchBar from '../../components/ItemSearchBar';
import ItemFilter, { ItemFilterProps } from '../../components/ItemFilter';
import ItemFilterButton from '../../components/ItemFilterButton';
import ItemCategory from '../../components/ItemCategory';
import ItemList from '../../components/ItemList';
import KakaoMapContainer from '../../components/KakaoMapContainer';

import { ItemType } from '../../components/KakaoMapContainer/itemType';

import * as S from './styles';

const MainPage = () => {
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');
  const [filterCondition, setFilterCondition] = useState<ItemFilterProps>({
    petType: 'all',
    status: 'sharing'
  });
  const [isShowFilterModal, setIsShowFilterModal] = useState<boolean>(false);

  // console.log('현재 필터 in Mainpage : ', filterCondition);

  return (
    <S.Container>
      <S.ItemInfo isOpenModal={isShowFilterModal} >
        <ItemSearchBar onChangeKeyword={setKeyword} />
        <S.ItemFilter>
          <ItemFilterButton isActive={isShowFilterModal} onClick={setIsShowFilterModal} />
          <ItemCategory onSelectCategory={setCategory} />
        </S.ItemFilter>
        <ItemList items={itemList} />
      </S.ItemInfo>
      {isShowFilterModal && <ItemFilter onClose={setIsShowFilterModal} condition={filterCondition} onSelectFilter={setFilterCondition}/>}
      <S.RegisterGood to='/upload'>글 작성</S.RegisterGood>

      <KakaoMapContainer
        items={itemList}
        category={category}
        condition={filterCondition}
        keyword={keyword}
        onSearchItems={setItemList}
      />
    </S.Container>
  );
};

export default MainPage;
