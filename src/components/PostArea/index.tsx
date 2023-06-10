import * as S from './PostArea.styles';

import React from "react";

interface MainTemplateProps {
  nickname: string;
  location: string;
  productName: string;
  firstCategory: string;
  secondCategory: string;
  uploadTime: string;
  productDetails: string;
}

function ImageCarousel({ nickname, location, productName, firstCategory, secondCategory, uploadTime, productDetails, }: MainTemplateProps) {
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
            <S.UploadTime>{uploadTime}</S.UploadTime>
          </div>
          <S.ProductDetails>{productDetails}</S.ProductDetails>
        </div>
        <div>
          <span># 웰시코기</span>
          <span># 유기농</span>
          <span># 알러지</span>
        </div>
      </S.PostContainer>
    </S.Container>
  );
}

export default ImageCarousel;
