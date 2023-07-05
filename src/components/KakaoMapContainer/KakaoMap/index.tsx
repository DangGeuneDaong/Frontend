import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../states/userInfo';
import { keyValueType, usePosts } from '../../../hooks/usePosts';

import MapMarkerController from '../MapMarkerController';
import { ItemFilterProps } from '../../ItemFilter';
import { ItemType } from '../itemType';

import * as S from './styles';

import uploadPostImg from '../../../assets/imgs/edit.png';

interface KakaoMapProps {
  mapItems: ItemType[];
  category: string;
  keyword: string;
  condition: ItemFilterProps;
  updateItems: Dispatch<SetStateAction<ItemType[]>>;
  currentPageItems: ItemType[];
  setMapBoundsInfo: Dispatch<SetStateAction<kakao.maps.LatLngBounds | undefined>>;
}

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

  // Data Fetch - 전체 데이터 (page제외, Lat/Lng 필수) + fetch후 updateItems(= setMapItemList)
  const queryParameters: keyValueType = {
    swLatitude: map && map.getBounds().getSouthWest().getLat(),
    swLongitude: map && map.getBounds().getSouthWest().getLng(),
    neLatitude: map && map.getBounds().getNorthEast().getLat(),
    neLongitude: map && map.getBounds().getNorthEast().getLng(),
    mainCategory: condition.petType,
    subCategory: category,
    status: condition.status,
    keyword: keyword,
  };

  const { isLoading, data } = usePosts(queryParameters);

  const searchItems = (kakaoMap: kakao.maps.Map) => {
    if (kakaoMap){
      const bounds = kakaoMap.getBounds();
      setMapBoundsInfo(bounds);
    }
  };

  useEffect(() => {
    const $mapContainer = document.getElementById('mapContainer'); // 지도를 표시할 div
    const kakaoMap = new kakao.maps.Map($mapContainer!, {
      // center: new kakao.maps.LatLng(userInfo.latitude, userInfo.longitude), // 지도의 중심좌표 (가입 시 유저정보 기준)
      center: new kakao.maps.LatLng(37.3952969470752, 127.110449292622), // 지도의 중심좌표 (판교)
      level: 4, // 지도의 확대 레벨
    });
    kakaoMap.setMinLevel(2);
    setMap(kakaoMap);
    searchItems(kakaoMap);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      updateItems(data);
    }
  }, [data]);

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
              onClick={() => searchItems(map)}
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
