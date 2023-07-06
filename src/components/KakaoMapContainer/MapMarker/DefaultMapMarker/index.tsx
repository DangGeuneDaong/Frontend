import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CategoryType, ItemType } from '../../itemType';

import dogMarkerImg from '../../../../assets/imgs/dog.png';
import catMarkerImg from '../../../../assets/imgs/cat.png';

import * as S from './styles';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../states/userInfo';
import { checkPostOwner } from '../../../../apis/good';

interface DefaultMapMarkerProps {
  key: string;
  item: ItemType;
  map: kakao.maps.Map;
}

const DefaultMapMarker = ({ item, map }: DefaultMapMarkerProps) => {
  const [isShow, setIsShow] = useState(false);
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

  useEffect(() => {
    // 활성화 마커 생성 로직
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(item.latitude, item.longitude),
      image: new kakao.maps.MarkerImage(
        item.mainCategory === 'dog' ? dogMarkerImg : catMarkerImg,
        new kakao.maps.Size(18, 18),
      )
    });
    marker.setMap(map);

    kakao.maps.event.addListener(marker, 'mouseover', () => {
      setIsShow(true);
    });

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      setIsShow(false);
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      moveDetailPage();
    });

    return () => {
      marker.setMap(null);  // 마커 제거
    }
  },[]);

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
        <S.Container onClick={moveDetailPage} isShow={isShow}>
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

export default DefaultMapMarker;