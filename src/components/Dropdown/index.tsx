import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import * as S from './styles';

export interface DropdownCSSProps {
  width?: string;
  listWidth?: number;
}

interface DropdownProps extends DropdownCSSProps {
  listData: string[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

function Dropdown({
  width,
  listData,
  selectedItem,
  onSelectItem,
}: DropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    onSelectItem(listData[0]);
  }, []);

  return (
    <S.DropdownContainer width={width} listWidth={listWidth}>
      <S.SelectedItem>
        <S.SelectedItemLabel onClick={() => setIsShow(!isShow)}>
          <span>{selectedItem}</span>
          <BiChevronDown className="dropdownIcon" />
        </S.SelectedItemLabel>
      </S.SelectedItem>

      <S.DropdownList ref={listRef} className={isShow ? 'show' : ''}>
        {listData
          .filter((item) => item !== selectedItem)
          .map((item, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => {
                setIsShow(false);
                onSelectItem(item);
              }}
            >
              {item}
            </S.DropdownItem>
          ))}
      </S.DropdownList>
    </S.DropdownContainer>
  );
}

export default Dropdown;
