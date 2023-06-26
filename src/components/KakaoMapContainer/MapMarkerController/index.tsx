import { ItemType } from "../itemType";

import MapMarker from "../MapMarker";

interface MapMarkerControllerProps {
  items: ItemType[];
  map?: kakao.maps.Map;
}

const MapMarkerController = ({items, map}: MapMarkerControllerProps) => {
  return (
    <>
      {
        items.map((item) => {
          return <MapMarker key={item.id.toString()} item={item} map={map}/>
        })
      }
    </>
  );
};

export default MapMarkerController;