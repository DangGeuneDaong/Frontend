import * as S from './styles';

const SkeletonItem = () => {
  return (
    <S.Container>
      <S.Status>
        <S.Shimmer/>
      </S.Status>
      <S.Title>
        <S.Shimmer/>
      </S.Title>
      <S.Location>
        <S.Shimmer/>
      </S.Location>
      <S.ImageCarousel>
        <S.Shimmer/>
      </S.ImageCarousel>
    </S.Container>
  );
};

export default SkeletonItem;