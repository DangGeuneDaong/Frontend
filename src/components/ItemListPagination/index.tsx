import { Dispatch, SetStateAction } from 'react';

import * as S from './styles';

interface ItemListPaginationProps {
  totalPage: number;
  currentPage: number;
  onMovePage: Dispatch<SetStateAction<number>>;
}

const ItemListPagination = ({totalPage, currentPage, onMovePage} : ItemListPaginationProps) => {
  const pageList = [];

  const movePage = (pageNum: number) => {
    if (pageNum > 0 && pageNum <= totalPage) {
      onMovePage(pageNum);
      // axios.get(해당 페이지의 물품들 가져오기); -> 그냥 setPage만 처리해주면 된다.

    }
  };

  for (let i = 1; i <= totalPage; i++) {
    pageList.push(
      <S.PageNum key={i} onClick={() => movePage(i)} isCurrent={currentPage === i} >{i}</S.PageNum>
    );
  }
  
  return (
    <S.Container>
      <S.PrevPageButton onClick={() => movePage(currentPage - 1)} disabled={currentPage === 1}/>
      <S.PagesContainer>
        {pageList}
      </S.PagesContainer>
      <S.NextPageButton onClick={() => movePage(currentPage + 1)} disabled={currentPage === totalPage}/>
    </S.Container>
  );
};

export default ItemListPagination;