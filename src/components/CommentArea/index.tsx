import * as S from './CommentArea.styles';

import React from "react";

interface MainTemplateProps {
  children: React.ReactNode;
}

function ImageCarousel({ children }: MainTemplateProps) {
  return <S.Container>{children}</S.Container>;
}

export default ImageCarousel;
