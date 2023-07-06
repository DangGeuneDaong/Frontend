import { useNavigate } from 'react-router-dom';

import ItemImageCarousel from '../ItemImageCarousel';
import { ItemType, StatusType } from '../../KakaoMapContainer/itemType';

import * as S from './styles';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../states/userInfo';
import { checkPostOwner } from '../../../apis/good';

interface ItemProps {
  itemInfo: ItemType;
}

const Item = ({ itemInfo }: ItemProps) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);

  const moveDetailPage = async () => {
    if (userInfo) {
      const isMyPost = await checkPostOwner(itemInfo.goodId, userInfo.userId);

      if (isMyPost) {
        return navigate(`/offer/${itemInfo.goodId}`);
      }
    }
    return navigate(`/taker/${itemInfo.goodId}`);
  };

  return (
    <S.Container>
      <S.ItemSection onClick={moveDetailPage}>
        <S.ItemStatus status={itemInfo.status}>
          {StatusType[itemInfo.status]}
        </S.ItemStatus>
        <S.ItemBasicInfo>
          <S.ItemTitle>{itemInfo.title}</S.ItemTitle>
          <S.ItemLocation>{itemInfo.location}</S.ItemLocation>
        </S.ItemBasicInfo>
      </S.ItemSection>
      <ItemImageCarousel
        size={itemInfo.goodImages.length}
        images={itemInfo.goodImages}
      />
    </S.Container>
  );
};

export default Item;
