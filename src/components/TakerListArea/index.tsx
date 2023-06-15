import Button from '../Button'
import * as S from './styles'

import React from 'react'

export interface OfferPageDataProps {
  nickname: string,
  distance: number,
  content: string,
}

interface OfferPageProps extends OfferPageDataProps {
  setProps: () => void;
  children: React.ReactNode;
}



function TakerListArea({ nickname, distance, content, setProps, children }: OfferPageProps) {
  // const address = await fetch(`${SERVER_URL}/address`)

  return (
    <S.Container>
      <S.ListItemContainer>
        <S.ProfileContainer></S.ProfileContainer>
        <div>
          <S.NameDistanceContainer>
            <span>{nickname}</span>
            <span>거리 약 {distance}km</span>
          </S.NameDistanceContainer>
          <div>
            <div>{content}</div>
          </div>
        </div>
        <S.ChatButtonContainer>
          <Button
            borderRadius={'10px'}
            onClickHandler={setProps}
          >{children}</Button>
        </S.ChatButtonContainer>
      </S.ListItemContainer>
    </S.Container >
  )
}

export default TakerListArea