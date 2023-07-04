import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CategoryType, ItemType } from '../../itemType';

import dogMarkerImg from '../../../../assets/imgs/dog.png';
import catMarkerImg from '../../../../assets/imgs/cat.png';

import * as S from './styles';

interface PageMapMarkerProps {
  key: string;
  item: ItemType;
  map: kakao.maps.Map;
}

const PageMapMarker = ({ item, map }: PageMapMarkerProps) => {
  const navigate = useNavigate();
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


  const moveDetailPage = () => {
    if (localStorage.getItem('access_token')){
      // 유저 id 가져오는 로직 + 해당 유저가 작성한 글인지 확인하는 로직
      // const { isMyPost } = await axios.get('http://localhost:8081/good/checkWriter');


      // if (해당 유저가 작성한 글이라면= true) {
        // navigate(`/good/offer/info?goodId=${itemInfo.id}`);
      // }
    }
    // navigate(`/good/taker/info?goodId=${item.id}`);
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