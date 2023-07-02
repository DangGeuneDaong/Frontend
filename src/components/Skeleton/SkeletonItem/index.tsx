import * as S from './styles';

const SkeletonItem = () => {
  return (
    <S.Container>
      <S.Status />
      <S.Title />
      <S.Location />
      <S.ImageCarousel />
    </S.Container>
  );
};

export default SkeletonItem;