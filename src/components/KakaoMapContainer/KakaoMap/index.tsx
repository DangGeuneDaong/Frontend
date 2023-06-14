import { Dispatch, SetStateAction, useEffect, useState } from "react";

import MapMarkerController from "../MapMarkerController";
import { ItemType } from "../itemType";

import * as S from './styles';

interface KakaoMapProps {
  items: ItemType[];
  category: string;
  keyword: string;
  updateItems: Dispatch<SetStateAction<ItemType[]>>;
}

const KakaoMap = ({ items, category, keyword, updateItems }: KakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();

  const searchItems = (lat: number, lon: number, kakaoMap: kakao.maps.Map) => {
    // 처음 페이지 로딩시 현재 위치 기반 물품들 보여주는 함수
    const searchItemByCurrentPosition = (pos: string) => {
      if (kakaoMap){
        const bounds = kakaoMap.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        
        fetch('http://localhost:5000/good').then(items => {
          const response = items.json();
          response.then(itemList => {
            updateItems(
              itemList
                .filter((_item: {category: string}) => 
                  category === 'all' ? true : category === _item.category
                )
                .filter((_item: { latitude: number, longitude: number }) => 
                  _item.latitude >= sw.getLat() && _item.latitude <= ne.getLat() 
                  && _item.longitude >= sw.getLng() && _item.longitude <= ne.getLng()
                )
            );
          })
        });
      }
    };

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lon);

    const getPosition = function(result: any, status: any) {
      let pos = '';
      if (status === kakao.maps.services.Status.OK) {
        pos = result[0].address.region_2depth_name
        searchItemByCurrentPosition(pos);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), getPosition);
  };

  // 현 지도 내 검색 버튼 누를 때 action
  const searchItemByCurrentBounds = () => {
    if (map){
      const bounds = map.getBounds();

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      fetch('http://localhost:5000/good').then(items => {
        const response = items.json();
        response.then(itemList => {
          updateItems(
            itemList
              .filter((_item: {category: string}) => 
                category === 'all' ? true : category === _item.category
              )
              .filter((_item: {title: string}) => 
                keyword === '' ? true : _item.title.includes(keyword)
              )
              .filter((_item: { latitude: number, longitude: number }) => 
                _item.latitude >= sw.getLat() && _item.latitude <= ne.getLat() 
                && _item.longitude >= sw.getLng() && _item.longitude <= ne.getLng()
              )
          );
        })
      })
    }
  };

  
  useEffect(() => {
    // 현재 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        
        const $mapContainer = document.getElementById('mapContainer'); // 지도를 표시할 div 
        const kakaoMap = new kakao.maps.Map($mapContainer!, { 
          center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표 (현재 위치)
          // center: new kakao.maps.LatLng(37.3952969470752, 127.110449292622), // 지도의 중심좌표 (판교)
          level: 4 // 지도의 확대 레벨
        }); 
        kakaoMap.setMinLevel(2);
        setMap(kakaoMap);
        searchItems(lat, lon, kakaoMap);
      }, 
      error => {
        console.log(error); // 에러 핸들링 필요
      }, {
        enableHighAccuracy: false
      });
    }
  }, []);

  useEffect(() => {
    searchItemByCurrentBounds();
  }, [category, keyword]);

  return (
    <>
      <S.Container>
        <MapMarkerController items={items} map={map}/>
        {map && <S.SearchItemButton type="button" onClick={searchItemByCurrentBounds}>현 지도에서 검색</S.SearchItemButton>}
      </S.Container>
    </>
  );
};

export default KakaoMap;
