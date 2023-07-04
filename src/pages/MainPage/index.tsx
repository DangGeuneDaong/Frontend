import { useState } from 'react';

import MainTemplate from '../../components/template/MainTemplate';
import ItemSearchBar from '../../components/ItemSearchBar';
import ItemFilter, { ItemFilterProps } from '../../components/ItemFilter';
import ItemFilterButton from '../../components/ItemFilterButton';
import ItemCategory from '../../components/ItemCategory';
import ItemList from '../../components/ItemList';
import KakaoMapContainer from '../../components/KakaoMapContainer';
import ItemListPagination from '../../components/ItemListPagination';

import { ItemType } from '../../components/KakaoMapContainer/itemType';

import * as S from './styles';

const MainPage = () => {
  const [mapItemList, setMapItemList] = useState<ItemType[]>([]);
  const [currentPageItemList, setCurrentPageItemList] = useState<ItemType[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>('all');
  const [filterCondition, setFilterCondition] = useState<ItemFilterProps>({
    petType: 'all',
    status: 'SHARING',
  });
  const [keyword, setKeyword] = useState<string>('');
  const [isShowFilterModal, setIsShowFilterModal] = useState<boolean>(false);
  const [mapBounds, setMapBounds] = useState<kakao.maps.LatLngBounds>();

  const totalPage = mapItemList && Math.ceil(mapItemList.length / 10);

  return (
    <MainTemplate>
      <S.Container>
        <S.ItemInfo isOpenModal={isShowFilterModal}>
          <ItemSearchBar
            onChangeKeyword={setKeyword}
            setPage={setCurrentPage}
          />
          <S.ItemFilter>
            <ItemFilterButton
              isActive={isShowFilterModal}
              onClick={setIsShowFilterModal}
            />
            <ItemCategory
              onSelectCategory={setCategory}
              setPage={setCurrentPage}
            />
          </S.ItemFilter>
          <ItemList
            currentPageItems={currentPageItemList}
            setCurrentPageItems={setCurrentPageItemList}
            category={category}
            condition={filterCondition}
            keyword={keyword}
            currentPage={currentPage}
            mapBoundsInfo={mapBounds}
          />
          <ItemListPagination
            totalPage={totalPage}
            currentPage={currentPage}
            onMovePage={setCurrentPage}
          />
        </S.ItemInfo>
        {isShowFilterModal && (
          <ItemFilter
            onClose={setIsShowFilterModal}
            condition={filterCondition}
            onSelectFilter={setFilterCondition}
            setPage={setCurrentPage}
          />
        )}

        <KakaoMapContainer
          mapItems={mapItemList}
          category={category}
          condition={filterCondition}
          keyword={keyword}
          onSearchItems={setMapItemList}
          currentPageItems={currentPageItemList}
          setMapBoundsInfo={setMapBounds}
        />
      </S.Container>
    </MainTemplate>
  );
};

export default MainPage;
