import * as S from './PostArea.styles';

import React from "react";

interface MainTemplateProps {
  children: React.ReactNode;
  nickname: string;
  location: string;
  productName: string;
  firstCategory: string;
  secondCategory: string;
  uploadTime: string;
  productDetails: string;
}

function ImageCarousel({ children, nickname, location, productName, firstCategory, secondCategory, uploadTime, productDetails, }: MainTemplateProps) {
  return (
    <S.Container>
      <div>{children}</div>
      <div>
        <div>
          <div>img</div>
          <div>
            <span>${nickname}</span>
            <span>${location}</span>
          </div>
        </div>
        <div>
          <div>${productName}</div>
          <div>
            <span>${firstCategory}</span>
            <span>${secondCategory}</span>
            <span>${uploadTime}</span>
          </div>
          <div>${productDetails}</div>
        </div>
        <div>
          <span># 웰시코기</span>
          <span># 유기농</span>
          <span># 알러지</span>
        </div>
      </div>
    </S.Container>
  );
}

export default ImageCarousel;
