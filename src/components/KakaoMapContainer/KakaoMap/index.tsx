import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import MapMarkerController from '../MapMarkerController';
import { ItemType } from '../itemType';
import { ItemFilterProps } from '../../ItemFilter';
import { getPosts } from '../../../apis/good';
import uploadPostImg from '../../../assets/imgs/edit.png';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../states/userInfo';

import * as S from './styles';

interface KakaoMapProps {
  mapItems: ItemType[];
  category: string;
  keyword: string;
  condition: ItemFilterProps;
  updateItems: Dispatch<SetStateAction<ItemType[]>>;
  currentPageItems: ItemType[];
  setMapBoundsInfo: Dispatch<SetStateAction<kakao.maps.LatLngBounds | undefined>>;
}
type keyValueType = {
  [key: string]: string | number | undefined;
};

const KakaoMap = ({
  mapItems,
  category,
  keyword,
  condition,
  updateItems,
  currentPageItems,
  setMapBoundsInfo
}: KakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const userInfo = useRecoilValue(userInfoState);

  // Data Fetch (전체 데이터) + fetch후 updateItems(= setMapItemList)
  // 전체 데이터 가져올 떄의 파라미터 (page는 필요없음, lat, lng필수 + 기타 파라미터)
  const queryParameters: keyValueType = {
    minLat: map && map.getBounds().getSouthWest().getLat(),
    minLng: map && map.getBounds().getSouthWest().getLng(),
    maxLat: map && map.getBounds().getNorthEast().getLat(),
    maxLng: map && map.getBounds().getNorthEast().getLng(),
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
  // console.log('전체 데이터 requestURL: ', requestURL);

  const { isLoading, error, data } = useQuery(
    requestURL,
    async () => {
      // 백엔드 연결 부분
      const requestURL2 = 'http://localhost:5000/mainGood';
      const result = await getPosts(requestURL);
      // console.log('젼체 getPosts : ', result);
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
      setMapBoundsInfo(bounds);
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      // fetch('http://localhost:5000/mainGood').then((items) => {
      //   const response = items.json();
      //   response.then((itemList) => {
      //     updateItems(
      //       itemList
      //         .filter((_item: { main_category: string }) =>
      //           condition.petType === 'all'
      //             ? true
      //             : condition.petType === _item.main_category
      //         )
      //         .filter((_item: { category: string }) =>
      //           category === 'all' ? true : category === _item.category
      //         )
      //         .filter((_item: { status: string }) =>
      //           condition.status === 'all'
      //             ? true
      //             : condition.status === _item.status
      //         )
      //         .filter(
      //           (_item: { latitude: number; longitude: number }) =>
      //             _item.latitude >= sw.getLat() &&
      //             _item.latitude <= ne.getLat() &&
      //             _item.longitude >= sw.getLng() &&
      //             _item.longitude <= ne.getLng()
      //         )
      //     );
      //   });
      // });
    };

    searchItemByCurrentPosition();
  };

  // 현 지도 내 검색 버튼 누를 때 action
  const searchItemByCurrentBounds = () => {
    if (map) {
      const bounds = map.getBounds();
      setMapBoundsInfo(bounds);
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      // fetch('http://localhost:5000/mainGood').then((items) => {
      //   const response = items.json();
      //   response.then((itemList) => {
      //     updateItems(
      //       itemList
      //         .filter((_item: { main_category: string }) =>
      //           condition.petType === 'all'
      //             ? true
      //             : condition.petType === _item.main_category
      //         )
      //         .filter((_item: { category: string }) =>
      //           category === 'all' ? true : category === _item.category
      //         )
      //         .filter((_item: { title: string }) =>
      //           keyword === '' ? true : _item.title.includes(keyword)
      //         )
      //         .filter((_item: { status: string }) =>
      //           condition.status === 'all'
      //             ? true
      //             : condition.status === _item.status
      //         )
      //         .filter(
      //           (_item: { latitude: number; longitude: number }) =>
      //             _item.latitude >= sw.getLat() &&
      //             _item.latitude <= ne.getLat() &&
      //             _item.longitude >= sw.getLng() &&
      //             _item.longitude <= ne.getLng()
      //         )
      //     );
      //   });
      // });
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
          console.log('userInfo : ', userInfo);
          const $mapContainer = document.getElementById('mapContainer'); // 지도를 표시할 div
          const kakaoMap = new kakao.maps.Map($mapContainer!, {
            // center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표 (현재 위치)
            center: new kakao.maps.LatLng(userInfo.latitude, userInfo.longitude), // 지도의 중심좌표 (판교)
            level: 4, // 지도의 확대 레벨
          });
          kakaoMap.setMinLevel(2);
          setMap(kakaoMap);
          searchItems(userInfo.latitude, userInfo.longitude, kakaoMap);
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
        {map && <MapMarkerController mapItems={mapItems} currentPageItems={currentPageItems} map={map} />}

        {map && (
          <>
            <S.UploadPost to="/upload">
              <S.UploadPostImg src={uploadPostImg} alt="나눔 글 작성 버튼" />
              나눔 글 작성
            </S.UploadPost>
            <S.SearchItemButton
              type="button"
              onClick={searchItemByCurrentBounds}
            >
              현 지도에서 검색
            </S.SearchItemButton>
          </>
        )}
      </S.Container>
    </>
  );
};

export default KakaoMap;
