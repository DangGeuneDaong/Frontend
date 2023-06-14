import { ItemType } from '../KakaoMapContainer/itemType';
import Item from './Item';

import * as S from './styles';

interface ItemListProps {
  items: ItemType[];
}

const ItemList = ({ items }: ItemListProps) => {
  const itemList = items.map((item) => {
    return <Item itemInfo={item} key={item.id} />;
  });

  return <S.Container>{itemList}</S.Container>;
};

export default ItemList;
