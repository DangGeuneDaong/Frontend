import Button from '../Button';
import * as S from './styles';

import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useRecoilState } from 'recoil';

import Textarea from '../Form/Textarea';
import axiosInstance from '../../apis';
import ChatRoomArea from '../ChatRoomArea';
import Chat from '../Chat/Chat';
import { userState } from '../../states/userInfo';
import { instance } from '../../apis/auth/api';

// interface TakerPageProps {
//   userId?: string;
// }
// { userId }: TakerPageProps

interface CommentAreaProps {
  changeButton: boolean;
  setChangeButton: Dispatch<SetStateAction<boolean>>;
}

function CommentArea({ changeButton, setChangeButton }: CommentAreaProps) {
  const param = useParams();
  // const param = '20';
  const postID = param.id as string;

  // theme 속 styled-components를 사용하기 위해 useTheme 선언
  const theme = useTheme();

  const [postComment, setPostComment] = useState<string>(''); // 댓글 Post 요청하기
  const [postTakerId, setPostTakerId] = useState<string>('');
  const [deleteComment, setDeleteComment] = useState<string>(''); // 댓글 Post 요청 취소하기

  // textarea 데이터를 '신청하기'버튼 클릭 시 submit
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 실시간 값 감시 가능
  } = useForm();

  // const SERVER_URL = 'http://localhost:5000';
  const postData = async (content: any) => {
    // 서버에 content 데이터 post하기
    try {
      const data = {
        userId: userId,
        goodId: postID,
        content: content.postComment,
      };

      await instance.post(`/sharing/application`, data);

      // chat/create로 takerId post하기
      // await instance.post(`/chat/create`, takerId);
    } catch (e) {
      console.log(e);
    }

    // Button 변경하기
    setChangeButton(true);
  };

  const deleteData = async () => {
    // 서버에 sharingApplication Delete하기
    try {
      await instance.delete(
        `/sharing/application?sharingApplicationId=${postID}` // 차후, sharing/application?sharingApplicationId=1로 변경
      );
    } catch (e) {
      console.log(e);
    }

    // Button 변경하기
    setChangeButton(false);
  };

  const [checkRoomId, setCheckRoomId] = useState<number>(-1);
  const [checkChatStatus, setCheckChatStatus] = useState<boolean>();
  // recoil로 user data
  // const [getUserData, setGetUserData] = useRecoilState<any>(userState);
  const userId = localStorage.getItem('userId');
  // instance.get(`/user/info?userId=${userId}`);
  // console.log(`userId: `, userId);

  useEffect(() => {
    const checkChatStatus = async () => {
      const { data } = await instance.get(`/chat/enter`);
      setCheckChatStatus(data.isOpened);
      setCheckRoomId(data.roomId);
    };
    checkChatStatus();
    // console.log(`checkChatStatus.takerId: `, checkChatStatus.takerId);
  }, []);
  console.log(`checkChatStatus1: `, checkChatStatus);

  return (
    <S.Container>
      {!changeButton && (
        <S.Form onSubmit={handleSubmit(postData)}>
          <Textarea
            placeholder={'궁금한 사항을 적어주세요!'}
            errors={errors}
            containerType="content"
            {...register('postComment')}
            width={'590px'}
            style={{
              height: '90px',
            }}
          />
          <Button
            width={'90px'}
            height={'90px'}
            borderRadius={'10px'}
            // onClickHandler={postCommentInfo}
            style={{
              lineHeight: '90px',
            }}
          >
            신청하기
          </Button>
        </S.Form>
      )}
      {changeButton && (
        <S.Form onSubmit={handleSubmit(deleteData)}>
          <Button
            height={'90px'}
            borderRadius={'10px'}
            style={{
              backgroundColor: 'white',
              borderColor: `${theme.color.red}`,
              fontSize: '30px',
            }}
          >
            신청취소
          </Button>
        </S.Form>
      )}
    </S.Container>
  );
}

export default CommentArea;
