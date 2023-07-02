import { Dispatch, SetStateAction, useEffect } from 'react';
import { useQuery } from 'react-query';

import Item from './Item';
import { getPosts } from '../../apis/good';
import { ItemType } from '../KakaoMapContainer/itemType';
import { ItemFilterProps } from '../ItemFilter';

import * as S from './styles';

import axios from 'axios';

type keyValueType = {
  [key: string]: string | number | undefined;
};
interface ItemListProps {
  pageItems: ItemType[];
  setPageItems: Dispatch<SetStateAction<ItemType[]>>;
  category: string;
  condition: ItemFilterProps;
  keyword: string;
  currentPage: number;
  mapBoundsInfo?: kakao.maps.LatLngBounds;
}

const ItemList = ({
  pageItems,
  setPageItems,
  category,
  condition,
  keyword,
  currentPage,
  mapBoundsInfo,
}: ItemListProps) => {
  // Data Fetch - 현재 페이지의 데이터 (Page + Lat/Lng 필수)
  const queryParameters: keyValueType = {
    page: currentPage,
    minLat: mapBoundsInfo && mapBoundsInfo.getSouthWest().getLat(),
    minLng: mapBoundsInfo && mapBoundsInfo.getSouthWest().getLng(),
    maxLat: mapBoundsInfo && mapBoundsInfo.getNorthEast().getLat(),
    maxLng: mapBoundsInfo && mapBoundsInfo.getNorthEast().getLng(),
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
  // console.log(`[현재 페이지 데이터] requestURL: ${requestURL}`);

  const { isLoading, error, data } = useQuery(
    requestURL,
    async () => {
      // 백엔드 연결 부분
      const result = await getPosts(requestURL);
      console.log('현재 페이지 getPosts : ', result);
      // return result;
    },
    {
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    }
  );

  useEffect(() => {
    // mockData 사용 부분
    if (mapBoundsInfo) {
      const response = axios.get('http://localhost:5000/mainGood');
      response.then((itemList) => {
        setPageItems(
          itemList.data
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
                _item.latitude >= mapBoundsInfo.getSouthWest().getLat() &&
                _item.latitude <= mapBoundsInfo.getNorthEast().getLat() &&
                _item.longitude >= mapBoundsInfo.getSouthWest().getLng() &&
                _item.longitude <= mapBoundsInfo.getNorthEast().getLng()
            )
            .slice((currentPage - 1) * 10, currentPage * 10)
        );
      });
    }
  }, [currentPage, mapBoundsInfo]);

  const itemList = pageItems.map((item) => {
    return <Item itemInfo={item} key={item.id} />;
  });

  return <S.Container>{itemList}</S.Container>;
};

export default ItemList;
