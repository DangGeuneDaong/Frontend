import ActiveMapMarker from "../MapMarker/ActiveMapMarker";
import PageMapMarker from "../MapMarker/PageMapMarker";

import { ItemType } from "../itemType";

interface MapMarkerControllerProps {
  mapItems: ItemType[];
  map: kakao.maps.Map;
  currentPageItems: ItemType[];
}

const MapMarkerController = ({mapItems, map, currentPageItems}: MapMarkerControllerProps) => {
  // mapItems(전체 데이터) -> 기본 마커
  const activeMapMarkers = mapItems && mapItems.map(item => {
    return <ActiveMapMarker key={item.id.toString()} item={item} map={map} />
  });

  // currentPageItems(현재 페이지 데이터) -> 활성화 마커
  const pageMapMarkers = currentPageItems.map((item) => {
    return <PageMapMarker key={item.id.toString()} item={item} map={map}/>
  });

  return (
    <>
      {activeMapMarkers}
      {pageMapMarkers}
    </>
  );
};

export default MapMarkerController;