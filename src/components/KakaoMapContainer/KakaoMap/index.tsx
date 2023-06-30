import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import MapMarkerController from '../MapMarkerController';
import { ItemType } from '../itemType';
import { ItemFilterProps } from '../../ItemFilter';
import { getPosts } from '../../../apis/good';

import * as S from './styles';

interface KakaoMapProps {
  items: ItemType[];
  category: string;
  keyword: string;
  condition: ItemFilterProps;
  updateItems: Dispatch<SetStateAction<ItemType[]>>;
  currentPage: number;
}
type keyValueType = {
  [key: string]: string | number | undefined;
};

const KakaoMap = ({
  items,
  category,
  keyword,
  condition,
  updateItems,
  currentPage,
}: KakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [mapBounds, setMapBounds] = useState<kakao.maps.LatLngBounds>();

  // API 분리
  const queryParameters: keyValueType = {
    page: currentPage,
    swLat: mapBounds && mapBounds.getSouthWest().getLat(),
    swLng: mapBounds && mapBounds.getSouthWest().getLng(),
    neLat: mapBounds && mapBounds.getNorthEast().getLat(),
    neLng: mapBounds && mapBounds.getNorthEast().getLng(),
    mainCategory: condition.petType,
    subCategory: category,
    status: condition.status,
    keyword: keyword,
  };

  let requestURL = '/good/taker/search/title?';

  for (const parameterKey in queryParameters) {
    if (
      queryParameters[parameterKey] &&
      queryParameters[parameterKey] !== 'all'
    )
      requestURL += `${parameterKey}=${queryParameters[parameterKey]}&`;
  }

  requestURL = requestURL.substring(0, requestURL.length - 1);

  const { isLoading, error, data } = useQuery(
    requestURL,
    async () => {
      // 백엔드 연결 부분
      // const { data } = await getPosts(requestURL);
      // return data;
    },
    {
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    }
  );

  const searchItems = (lat: number, lon: number, kakaoMap: kakao.maps.Map) => {
    // 처음 페이지 로딩시 현재 위치 기반 물품들 보여주는 함수
    const searchItemByCurrentPosition = () => {
      const bounds = kakaoMap.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      setMapBounds(bounds);

      fetch('http://13.209.220.63:8080/good').then((items) => {
        const response = items.json();
        response.then((itemList) => {
          updateItems(
            itemList
              .filter((_item: { main_category: string }) =>
                condition.petType === 'all'
                  ? true
                  : condition.petType === _item.main_category
              )
              .filter((_item: { category: string }) =>
                category === 'all' ? true : category === _item.category
              )
              .filter((_item: { status: string }) =>
                condition.status === 'all'
                  ? true
                  : condition.status === _item.status
              )
              .filter(
                (_item: { latitude: number; longitude: number }) =>
                  _item.latitude >= sw.getLat() &&
                  _item.latitude <= ne.getLat() &&
                  _item.longitude >= sw.getLng() &&
                  _item.longitude <= ne.getLng()
              )
          );
        });
      });
    };

    searchItemByCurrentPosition();
  };

  // 현 지도 내 검색 버튼 누를 때 action
  const searchItemByCurrentBounds = () => {
    if (map) {
      const bounds = map.getBounds();

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      fetch('http://13.209.220.63:8080/good').then((items) => {
        const response = items.json();
        response.then((itemList) => {
          updateItems(
            itemList
              .filter((_item: { main_category: string }) =>
                condition.petType === 'all'
                  ? true
                  : condition.petType === _item.main_category
              )
              .filter((_item: { category: string }) =>
                category === 'all' ? true : category === _item.category
              )
              .filter((_item: { title: string }) =>
                keyword === '' ? true : _item.title.includes(keyword)
              )
              .filter((_item: { status: string }) =>
                condition.status === 'all'
                  ? true
                  : condition.status === _item.status
              )
              .filter(
                (_item: { latitude: number; longitude: number }) =>
                  _item.latitude >= sw.getLat() &&
                  _item.latitude <= ne.getLat() &&
                  _item.longitude >= sw.getLng() &&
                  _item.longitude <= ne.getLng()
              )
          );
        });
      });
    }
  };

  useEffect(() => {
    // 현재 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도

          const $mapContainer = document.getElementById('mapContainer'); // 지도를 표시할 div
          const kakaoMap = new kakao.maps.Map($mapContainer!, {
            // center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표 (현재 위치)
            center: new kakao.maps.LatLng(37.3952969470752, 127.110449292622), // 지도의 중심좌표 (판교)
            level: 4, // 지도의 확대 레벨
          });
          kakaoMap.setMinLevel(2);
          setMap(kakaoMap);
          searchItems(lat, lon, kakaoMap);
        },
        (error) => {
          console.log(error); // 에러 핸들링 필요
        },
        {
          enableHighAccuracy: false,
        }
      );
    }
  }, []);

  useEffect(() => {
    searchItemByCurrentBounds();
  }, [category, keyword, condition]);

  return (
    <>
      <S.Container>
        <MapMarkerController items={items} map={map} />
        {map && (
          <S.SearchItemButton type="button" onClick={searchItemByCurrentBounds}>
            현 지도에서 검색
          </S.SearchItemButton>
        )}
      </S.Container>
    </>
  );
};

export default KakaoMap;
