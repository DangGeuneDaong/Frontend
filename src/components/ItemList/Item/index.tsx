import { useState } from "react";
import { ItemType } from "../../KakaoMapContainer/itemType";

import * as S from './styles';

interface ItemProps {
  itemInfo: ItemType;
}

const Item = ({itemInfo} : ItemProps) => {
  const [location, setLocation] = useState<string>('');
  
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(itemInfo.latitude, itemInfo.longitude);
  
  // any -> any로 인해 발생할 수 있는 이상한 데이터는??
  const coordToAddress = (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setLocation(result[0].road_address.address_name);
    }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), coordToAddress);

  return (
    <S.Container>
      <S.ItemSection>
        <S.ItemStatus status={'나눔중'}>나눔중</S.ItemStatus>
        <S.ItemBasicInfo>
          <S.ItemTitle>{itemInfo.title}</S.ItemTitle>
          <S.ItemLocation>{location}</S.ItemLocation>
        </S.ItemBasicInfo>
      </S.ItemSection>
      <S.ItemImages>Item Images</S.ItemImages>
    </S.Container>
  );
};

export default Item;