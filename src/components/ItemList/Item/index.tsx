import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemImageCarousel from "../ItemImageCarousel";
import { ItemType, StatusType } from "../../KakaoMapContainer/itemType";

import * as S from './styles';

interface ItemProps {
  itemInfo: ItemType;
}

const Item = ({itemInfo} : ItemProps) => {
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();
  
  const moveDetailPage = () => {
    if (localStorage.getItem('access_token')){
      // 유저 id 가져오는 로직 + 해당 유저가 작성한 글인지 확인하는 로직
      // const { isMyPost } = await axios.get('http://localhost:8081/good/checkWriter');


      // if (해당 유저가 작성한 글이라면= true) {
        // navigate(`/good/offer/info?goodId=${itemInfo.id}`);
      // }
    }
    navigate(`/good/taker/info?goodId=${itemInfo.id}`);
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
      <ItemImageCarousel size={itemInfo.good_image_list.length} images={itemInfo.good_image_list} />
    </S.Container>
  );
};

export default Item;