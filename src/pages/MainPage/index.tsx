import { useState } from 'react';

import ItemSearchBar from '../../components/ItemSearchBar';
import ItemList from '../../components/ItemList';
import ItemCategory from '../../components/ItemCategory';
import KakaoMapContainer from '../../components/KakaoMapContainer';
import { ItemType } from '../../components/KakaoMapContainer/itemType';

import * as S from './styles';

const MainPage = () => {
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');

  return (
    <S.Container>
      <S.ItemInfo>
        <ItemSearchBar onChangeKeyword={setKeyword} />
        <ItemCategory onSelectCategory={setCategory} />
        <ItemList items={itemList} />
      </S.ItemInfo>

      <KakaoMapContainer
        items={itemList}
        category={category}
        keyword={keyword}
        onSearchItems={setItemList}
      />
    </S.Container>
  );
};

export default MainPage;
