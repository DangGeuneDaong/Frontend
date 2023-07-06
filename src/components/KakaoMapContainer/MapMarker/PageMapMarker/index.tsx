import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CategoryType, ItemType } from '../../itemType';

import dogMarkerImg from '../../../../assets/imgs/dog.png';
import catMarkerImg from '../../../../assets/imgs/cat.png';

import * as S from './styles';
import { checkPostOwner } from '../../../../apis/good';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../states/userInfo';

interface PageMapMarkerProps {
  key: string;
  item: ItemType;
  map: kakao.maps.Map;
}

const PageMapMarker = ({ item, map }: PageMapMarkerProps) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const $markerContainer = document.createElement('div');  
  $markerContainer.style.position = 'absolute';
  $markerContainer.style.zIndex = '1';
  $markerContainer.style.left = '-26px';
  $markerContainer.style.bottom = '12px';

  const customOverlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(item.latitude, item.longitude),
    content: $markerContainer,
  });

  $markerContainer.addEventListener('mouseenter', () => {
    customOverlay.setZIndex(2);
  });

  $markerContainer.addEventListener('mouseleave', () => {
    customOverlay.setZIndex(1);
  });

  customOverlay.setMap(map);


  const moveDetailPage = async () => {
    if (userInfo) {
      const isMyPost = await checkPostOwner(item.goodId, userInfo.userId);

      if (isMyPost) {
        return navigate(`/offer/${item.goodId}`);
      }
    }
    return navigate(`/taker/${item.goodId}`);
  };

  return (
    $markerContainer
      && createPortal(
        <S.Container onClick={moveDetailPage}>
          {item.mainCategory === 'dog' 
            ? <S.MarkerImage src={dogMarkerImg} alt='강아지'/>
            : <S.MarkerImage src={catMarkerImg} alt='고양이'/>}
          <S.ItemInfo>
            <S.Title>{item.title}</S.Title>
            <S.Category>{CategoryType[item.subCategory]}</S.Category>
          </S.ItemInfo>
        </S.Container>
        , $markerContainer)
  );
};

export default PageMapMarker;