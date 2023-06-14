import { Dispatch, SetStateAction, useState } from 'react';

import * as S from './styles';

interface ItemSearchBarProps {
  onChangeKeyword: Dispatch<SetStateAction<string>>;
}

const ItemSearchBar = ({onChangeKeyword}: ItemSearchBarProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const searchItemByKeyword = () => {
    if (keyword !== '') {
      onChangeKeyword(keyword);
    } else {
      console.log('검색할 키워드를 입력해주세요!'); // 모달창?
      setIsFocus(true);
    }
  };

  const removeInputValue = () => {
    setKeyword('');
    onChangeKeyword('');
  };

  return (
    <S.Container>
      <S.ItemSearchInputLabel
        htmlFor="searchBar"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        focus={isFocus}
      > 
        <S.ItemSearchButton type="button" onClick={searchItemByKeyword} $isFocus={isFocus} />
        <S.ItemSearchInput
          id="seacrhBar"
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchItemByKeyword()}
        />
        {keyword !== '' && <S.RemoveInputValueButton type="button" onClick={removeInputValue}/>}
      </S.ItemSearchInputLabel>
    </S.Container>
  );
};

export default ItemSearchBar;
