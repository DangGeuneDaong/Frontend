import ReactDOM from 'react-dom';

import { CategoryType, ItemType } from '../itemType';

import dogMarkerImg from '../../../assets/imgs/dog.png';
import catMarkerImg from '../../../assets/imgs/cat.png';

import * as S from './styles';

interface MapMarkerProps {
  key: string;
  item: ItemType;
  map?: kakao.maps.Map;
}

const MapMarker = ({ item, map }: MapMarkerProps) => {
  const $markerContainer = document.createElement('div');  
  $markerContainer.style.position = 'absolute';
  $markerContainer.style.left = '-26px';
  $markerContainer.style.bottom = '10px';

  const customOverlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(item.latitude, item.longitude),
    content: $markerContainer,
  });

  $markerContainer.addEventListener('mouseenter', () => {
    customOverlay.setZIndex(1);
  });

  $markerContainer.addEventListener('mouseleave', () => {
    customOverlay.setZIndex(0);
  });

  customOverlay.setMap(map!);

  return (
    $markerContainer
      && ReactDOM.createPortal(
          <S.Container>
            {item.main_category === 'dog' 
              ? <S.MarkerImage src={dogMarkerImg} alt='강아지'/>
              : <S.MarkerImage src={catMarkerImg} alt='고양이'/>}
            <S.ItemInfo>
              <S.Title>{item.title}</S.Title>
              <S.Category>{CategoryType[item.category]}</S.Category>
            </S.ItemInfo>
          </S.Container>
        , $markerContainer)
  );
};

export default MapMarker;