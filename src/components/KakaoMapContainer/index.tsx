import { Dispatch, SetStateAction } from 'react';

import KakaoMap from './KakaoMap';
import ScriptLoader from './ScriptLoader';
import { ItemType } from './itemType';

import * as S from './styles';
import { ItemFilterProps } from '../ItemFilter';

interface KakaoMapContainerProps {
  mapItems: ItemType[];
  category: string;
  keyword: string;
  condition: ItemFilterProps;
  onSearchItems: Dispatch<SetStateAction<ItemType[]>>;
  currentPageItems: ItemType[];
  setMapBoundsInfo: Dispatch<SetStateAction<kakao.maps.LatLngBounds | undefined>>;
}

const KakaoMapContainer = ({
  mapItems,
  category,
  keyword,
  condition,
  onSearchItems,
  currentPageItems,
  setMapBoundsInfo
}: KakaoMapContainerProps) => {
  return (
    <S.Container id="mapContainer">
      <ScriptLoader>
        <KakaoMap
          mapItems={mapItems}
          category={category}
          keyword={keyword}
          condition={condition}
          updateItems={onSearchItems}
          currentPageItems={currentPageItems}
          setMapBoundsInfo={setMapBoundsInfo}
        />
      </ScriptLoader>
    </S.Container>
  );
};

export default KakaoMapContainer;
