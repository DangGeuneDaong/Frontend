import * as S from './styles'
import { useTheme } from 'styled-components'

import { BsSend } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

import Input from '../Form/Input'
import Button from '../Button'

function ChatRoomArea() {
  const theme = useTheme();

  return (
    <S.Container>
      <S.ChatHeaderContainer>
        <S.ProfileContainer></S.ProfileContainer>
        <S.NameDistanceContainer>
          <span>밥먹는 춘식이</span>
          <span>거리 약 2.5km</span>
        </S.NameDistanceContainer>
      </S.ChatHeaderContainer>
      <S.ChatBodyContainer>
        <S.OfferContainer>
          <S.ChatContent>안녕하세요!! OOO은 들어있지 않습니다!!! 알러지는 안심하셔도 될 것 같아요</S.ChatContent>
          <div>17:20</div>
        </S.OfferContainer>
        <S.TakerContainer>
          <S.TakerProfile></S.TakerProfile>
          <S.ChatContent>오 다행이네요!! 웰시코기 유기농 사료 몇 개 나눔하시나요?????? 답변 꼭 부탁드리겠습니다!!!</S.ChatContent>
          <div>17:30</div>
        </S.TakerContainer>
      </S.ChatBodyContainer>
      <S.ChatFooterContainer>
        <button><AiOutlinePlus /></button>
        <S.ChatInputContainer>
          <input type='text' placeholder="내용을 입력해주세요." />
        </S.ChatInputContainer>
        <button><BsSend /></button>
      </S.ChatFooterContainer>
    </S.Container >
  )
}

export default ChatRoomArea