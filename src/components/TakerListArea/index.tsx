import Button from '../Button'
import * as S from './styles'

import React from 'react'

interface OfferPageProps {
  setProps: () => void;
  children: React.ReactNode;
}

function TakerListArea({ setProps, children }: OfferPageProps) {
  // const address = await fetch(`${SERVER_URL}/address`)

  return (
    <S.Container>
      <S.ListTitleContainer>Taker 목록</S.ListTitleContainer>

      <S.ListItemContainer>
        <S.ProfileContainer></S.ProfileContainer>
        <div>
          <S.NameDistanceContainer>
            <span>밥먹는 춘식이</span>
            <span>거리 약 2.5km</span>
          </S.NameDistanceContainer>
          <div>
            <div>사료 성분에 OOO이 들어있는지 궁금해요! 저희 강아지가 알러지가 있어서요!!</div>
          </div>
        </div>
        <S.ChatButtonContainer>
          <Button
            borderRadius={'10px'}
            onClickHandler={setProps}
          >{children}</Button>
        </S.ChatButtonContainer>
      </S.ListItemContainer>

      <div>페이지네이션</div>
    </S.Container >
  )
}

export default TakerListArea