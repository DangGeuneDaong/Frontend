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
import PopLayer from '../PopLayer';
import Confirm from '../Modal/Confirm';
import { instance } from '../../apis/auth/api';
// import Chat from '../Chat/Chat';

interface OfferPageProps {
  // getBack: () => void;
  onHide?: () => void;
  id?: number;
  takerId?: string;
  distance?: number;
  children?: React.ReactNode;
  // onClickDeleteChatRoomId?: () => void;
  roomId?: number;
  sharingId?: number;
}

function ChatRoomArea({
  id,
  takerId,
  distance,
  onHide,
  children,
  roomId,
  sharingId,
}: OfferPageProps) {
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chatMenuList = [
    {
      name: '대화 종료',
      onClickHandler: () => {
        setIsModalOpen(true);
      },
      itemStyle: { color: 'red' },
    },
  ];

  // (대화 종료) 채팅창 Delete, SharingApplication Table Delete 요청
  const handleDeleteChat = async () => {
    // 1. 해당 Taker와의 채팅창 Delete하기
    // await instance.delete(`/chat/leave?roomId=${roomId}`);
    // 2. 해당 Taker의 SharingApplication Table Delete하기
    // await instance.delete(
    //   `/sharing/application?sharingApplicationId=${sharingId}`
    // );
  };

  return (
    <S.Container>
      <S.ChatHeaderContainer>
        <S.Button onClick={onHide}>
          <AiOutlineArrowLeft />
        </S.Button>
        <S.ProfileContainer>
          <S.PictureContainer></S.PictureContainer>
          <S.NameDistanceContainer>
            <span>{id}</span>
            <span>{takerId}</span>
            <span>거리 약 {distance}km</span>
          </S.NameDistanceContainer>
        </S.ProfileContainer>
        <PopLayer itemList={chatMenuList}>
          <S.Button>
            <AiOutlineMenu />
          </S.Button>
        </PopLayer>
        {isModalOpen && (
          <Confirm
            title={'대화를 종료하시겠습니까?'}
            message={
              '지금 대화를 종료하실 경우, 해당 Taker와는 더 이상 대화하실 수 없습니다.'
            }
            onConfirm={() => handleDeleteChat()}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
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
