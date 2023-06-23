import { useState } from 'react';

import * as S from './style';

interface itemListProps {
  name: string;
  onClickHandler: () => void;
  itemStyle?: React.CSSProperties; // 각 아이템에 추가 스타일이 필요할 때
}

export interface PopLayerCSSProps {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

interface PopLayerProps extends PopLayerCSSProps {
  children?: React.ReactNode; // 클릭하면 팝레이어가 나오는 버튼
  style?: React.CSSProperties;
  itemList: itemListProps[];
}

function PopLayer({
  children,
  style,
  top = 'calc(100% + 8px)',
  left,
  bottom,
  right = '-3px',
  itemList,
}: PopLayerProps) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <S.Container onClick={() => setIsShow(!isShow)}>
      {children}

      {isShow && (
        <S.ListContainer
          style={style}
          top={top}
          left={left}
          bottom={bottom}
          right={right}
        >
          {itemList.map((item, index) => {
            return (
              <S.ListItem
                key={index}
                onClick={item.onClickHandler}
                style={item.itemStyle}
                onMouseEnter={(event) => {
                  event.currentTarget.classList.add('hover');
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.classList.remove('hover');
                }}
              >
                {item.name}
              </S.ListItem>
            );
          })}
        </S.ListContainer>
      )}
    </S.Container>
  );
}

export default PopLayer;
