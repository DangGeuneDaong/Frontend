import { Dispatch, SetStateAction } from "react";

import KakaoMap from "./KakaoMap";
import ScriptLoader from "./ScriptLoader";
import { ItemType } from "./itemType";

import * as S from './styles';

interface KakaoMapContainerProps {
  items: ItemType[];
  category: string;
  keyword: string;
  onSearchItems: Dispatch<SetStateAction<ItemType[]>>;
}

const KakaoMapContainer = ({items, category, keyword, onSearchItems}: KakaoMapContainerProps) => {
  return (
    <S.Container id='mapContainer'>
      <ScriptLoader>
        <KakaoMap items={items} category={category} keyword={keyword} updateItems={onSearchItems} />
      </ScriptLoader>
    </S.Container>
  );
};

export default KakaoMapContainer;