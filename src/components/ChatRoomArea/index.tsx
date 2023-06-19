import * as S from './styles'
import { useTheme } from 'styled-components'

import { BsSend } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineMenu } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Input from '../Form/Input'
import Button from '../Button'

interface OfferPageProps {
  getBack: () => void;
  nickname: string,
  distance: string,
}

function ChatRoomArea({ getBack, nickname, distance }: OfferPageProps) {
  const [showTakerlists, setShowTakerlists] = useState([])

  const theme = useTheme();

  useEffect(() => {
    const SERVER_URL = 'http://localhost:5000'
    const fetchData = async () => {
      const result_takerlists = await axios.get(`${SERVER_URL}/takerlists`)
      setShowTakerlists(result_takerlists.data)
      console.log('result_takerlists.data :', result_takerlists.data)
    }
    fetchData()
  }, [])


  return (
    <S.Container>
      <S.ChatHeaderContainer>
        <button onClick={getBack}
        ><AiOutlineArrowLeft /></button>
        <S.ProfileContainer>
          <S.PictureContainer></S.PictureContainer>
          <S.NameDistanceContainer>
            <span>{nickname}</span>
            <span>거리 약 {distance}km</span>
          </S.NameDistanceContainer>
        </S.ProfileContainer>
        <button><AiOutlineMenu /></button>
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

    </S.Container>

  )
}

export default ChatRoomArea