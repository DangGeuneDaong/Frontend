import * as S from './styles';

import React from "react";

interface MainTemplateProps {
  nickname: string;
  location: string;
  productName: string;
  firstCategory: string;
  secondCategory: string;
  createdTime: string;
  productDetails: string;
}

function ImageCarousel({ nickname, location, productName, firstCategory, secondCategory, createdTime, productDetails }: MainTemplateProps) {
  return (
    <S.Container>
      <S.ProfileContainer>
        <div></div>
        <div>
          <div>{nickname}</div>
          <div>{location}</div>
        </div>
      </S.ProfileContainer>
      <S.PostContainer>
        <div>
          <S.ProductName>{productName}</S.ProductName>
          <div>
            <S.FirstCategory>{firstCategory}</S.FirstCategory>|
            <S.SecondCategory>{secondCategory}</S.SecondCategory>
            <S.UploadTime>{createdTime}</S.UploadTime>
          </div>
          <S.ProductDetails>{productDetails}</S.ProductDetails>
        </div>
      </S.PostContainer>
    </S.Container>
  );
}

export default ImageCarousel;
