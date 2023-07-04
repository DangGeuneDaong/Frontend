import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemImageCarousel from "../ItemImageCarousel";
import { ItemType, StatusType } from "../../KakaoMapContainer/itemType";

import * as S from './styles';
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../states/userInfo";
import { checkPostOwner } from "../../../apis/good";

interface ItemProps {
  itemInfo: ItemType;
}

const Item = ({itemInfo} : ItemProps) => {
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  
  const moveDetailPage = async () => {
    if (userInfo) {
      const isMyPost = await checkPostOwner(itemInfo.goodId, userInfo.userId);

      if (isMyPost) {
        navigate(`/offer/${itemInfo.goodId}`);
      }
    }
    navigate(`/taker/${itemInfo.goodId}`);
  };

  // any -> any로 인해 발생할 수 있는 이상한 데이터는??
  const coordToAddress = (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setLocation(result[0].road_address.address_name);
    }
  };
  
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(itemInfo.latitude, itemInfo.longitude);
  geocoder.coord2Address(coord.getLng(), coord.getLat(), coordToAddress);

  return (
    <S.Container>
      <S.ItemSection onClick={moveDetailPage}>
        <S.ItemStatus status={itemInfo.status}>{StatusType[itemInfo.status]}</S.ItemStatus>
        <S.ItemBasicInfo>
          <S.ItemTitle>{itemInfo.title}</S.ItemTitle>
          <S.ItemLocation>{location}</S.ItemLocation>
        </S.ItemBasicInfo>
      </S.ItemSection>
      <ItemImageCarousel size={itemInfo.goodImages.length} images={itemInfo.goodImages} />
    </S.Container>
  );
};

export default Item;