import SkeletonItem from "../SkeletonItem";

import * as S from './styles';

const SkeletonItemList = () => {
  return (
    <S.Container>
      <SkeletonItem/> 
      <SkeletonItem/> 
      <SkeletonItem/> 
      <SkeletonItem/> 
      <SkeletonItem/> 
    </S.Container>
  );
};

export default SkeletonItemList;