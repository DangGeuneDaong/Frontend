import * as S from './styles';
import { useTheme } from 'styled-components';

import { BsSend } from 'react-icons/bs';
import {
  AiOutlinePlus,
  AiOutlineArrowLeft,
  AiOutlineMenu,
} from 'react-icons/ai';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../Form/Input';
import Button from '../Button';
// import Chat from '../Chat/Chat';

interface OfferPageProps {
  // getBack: () => void;
  id?: number;
  nickname?: string;
  distance?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

function ChatRoomArea({
  id,
  nickname,
  distance,
  onClose,
  children,
}: OfferPageProps) {
  const [showTakerlists, setShowTakerlists] = useState([]);

  const theme = useTheme();

  return (
    <S.Container>
      <S.ChatHeaderContainer>
        <button onClick={onClose}>
          <AiOutlineArrowLeft />
        </button>
        <S.ProfileContainer>
          <S.PictureContainer></S.PictureContainer>
          <S.NameDistanceContainer>
            <span>{id}</span>
            <span>{nickname}</span>
            <span>거리 약 {distance}km</span>
          </S.NameDistanceContainer>
        </S.ProfileContainer>
        <button>
          <AiOutlineMenu />
        </button>
      </S.ChatHeaderContainer>
      <S.ChatBodyContainer>
        {/* <S.OfferContainer>
          <S.ChatContent>
            안녕하세요!! OOO은 들어있지 않습니다!!! 알러지는 안심하셔도 될 것
            같아요
          </S.ChatContent>
          <div>17:20</div>
        </S.OfferContainer>
        <S.TakerContainer>
          <S.TakerProfile></S.TakerProfile>
          <S.ChatContent>
            오 다행이네요!! 웰시코기 유기농 사료 몇 개 나눔하시나요?????? 답변
            꼭 부탁드리겠습니다!!!
          </S.ChatContent>
          <div>17:30</div>
        </S.TakerContainer> */}
        {children}
      </S.ChatBodyContainer>
      {/* <S.ChatFooterContainer>
        <button>
          <AiOutlinePlus />
        </button>
        <S.ChatInputContainer>
          <input type="text" placeholder="내용을 입력해주세요." />
        </S.ChatInputContainer>
        <button>
          <BsSend />
        </button>
      </S.ChatFooterContainer> */}
    </S.Container>
  );
}

export default ChatRoomArea;
