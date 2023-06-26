import { useState } from 'react';

import ItemSearchBar from '../../components/ItemSearchBar';
import ItemFilter, { ItemFilterProps } from '../../components/ItemFilter';
import ItemFilterButton from '../../components/ItemFilterButton';
import ItemCategory from '../../components/ItemCategory';
import ItemList from '../../components/ItemList';
import KakaoMapContainer from '../../components/KakaoMapContainer';
import PaginationMK from '../../components/PaginationMK';

import { ItemType } from '../../components/KakaoMapContainer/itemType';
import uploadPostImg from '../../assets/imgs/edit.png';

import * as S from './styles';
import MainTemplate from '../../components/template/MainTemplate';

const MainPage = () => {
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');
  const [filterCondition, setFilterCondition] = useState<ItemFilterProps>({
    petType: 'all',
    status: 'sharing'
  });
  const [isShowFilterModal, setIsShowFilterModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <MainTemplate>
      <S.Container>
        <S.ItemInfo isOpenModal={isShowFilterModal} >
          <ItemSearchBar onChangeKeyword={setKeyword} setPage={setCurrentPage}/>
          <S.ItemFilter>
            <ItemFilterButton isActive={isShowFilterModal} onClick={setIsShowFilterModal} />
            <ItemCategory onSelectCategory={setCategory} setPage={setCurrentPage} />
          </S.ItemFilter>
          <ItemList items={itemList} />
          <PaginationMK items={itemList} currentPage={currentPage} onMovePage={setCurrentPage}/>
        </S.ItemInfo>
        {isShowFilterModal && <ItemFilter onClose={setIsShowFilterModal} condition={filterCondition} onSelectFilter={setFilterCondition} setPage={setCurrentPage}/>}
        <S.UploadPost to='/upload'>
          <S.UploadPostImg src={uploadPostImg} alt='나눔 글 작성 버튼' />
          나눔 글 작성
        </S.UploadPost>

        <KakaoMapContainer
          items={itemList}
          category={category}
          condition={filterCondition}
          keyword={keyword}
          onSearchItems={setItemList}
          currentPage={currentPage}
        />
      </S.Container>
    </MainTemplate>
  );
};

export default MainPage;
