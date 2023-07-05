import DefaultMapMarker from "../MapMarker/DefaultMapMarker";
import PageMapMarker from "../MapMarker/PageMapMarker";

import { ItemType } from "../itemType";

interface MapMarkerControllerProps {
  mapItems: ItemType[];
  map: kakao.maps.Map;
  currentPageItems: ItemType[];
}

const MapMarkerController = ({mapItems, map, currentPageItems}: MapMarkerControllerProps) => {
  // mapItems(전체 데이터) -> 기본 마커
  const defaultMapMarkers = mapItems && mapItems.map(item => {
    return <DefaultMapMarker key={item.goodId.toString()} item={item} map={map} />
  });

  // currentPageItems(현재 페이지 데이터) -> 활성화 마커
  const pageMapMarkers = currentPageItems && currentPageItems.map((item) => {
    return <PageMapMarker key={item.goodId.toString()} item={item} map={map}/>
  });

  return (
    <>
      {defaultMapMarkers}
      {pageMapMarkers}
    </>
  );
};

export default MapMarkerController;