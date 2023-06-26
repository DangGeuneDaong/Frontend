import { Dispatch, SetStateAction } from 'react';

import KakaoMap from './KakaoMap';
import ScriptLoader from './ScriptLoader';
import { ItemType } from './itemType';

import * as S from './styles';
import { ItemFilterProps } from '../ItemFilter';

interface KakaoMapContainerProps {
  items: ItemType[];
  category: string;
  keyword: string;
  condition: ItemFilterProps;
  onSearchItems: Dispatch<SetStateAction<ItemType[]>>;
  currentPage: number;
}

const KakaoMapContainer = ({
  items,
  category,
  keyword,
  condition,
  onSearchItems,
  currentPage
}: KakaoMapContainerProps) => {
  return (
    <S.Container id="mapContainer">
      <ScriptLoader>
        <KakaoMap
          items={items}
          category={category}
          keyword={keyword}
          condition={condition}
          updateItems={onSearchItems}
          currentPage={currentPage}
        />
      </ScriptLoader>
    </S.Container>
  );
};

export default KakaoMapContainer;
