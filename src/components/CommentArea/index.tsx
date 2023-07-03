import Button from '../Button';
import * as S from './styles';

import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useRecoilState } from 'recoil';

import Textarea from '../Form/Textarea';
import axiosInstance from '../../apis';
import ChatRoomArea from '../ChatRoomArea';
import Chat from '../Chat/Chat';
import { userInfoState } from '../../states/userInfo';
import { instance } from '../../apis/auth/api';

interface TakerPageProps {
  userId?: string;
}

function CommentArea({ userId }: TakerPageProps) {
  const param = useParams();
  // theme 속 styled-components를 사용하기 위해 useTheme 선언
  const theme = useTheme();

  const [changeButton, setChangeButton] = useState(false);
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

  const SERVER_URL = 'http://13.209.220.63';
  // const SERVER_URL = 'http://localhost:5000';
  const fetchData = async ({ content, takerId }: any) => {
    const result_comment = await instance.post(
      `${SERVER_URL}/sharing/application`,
      content
    );
    setPostComment(result_comment.data.content);
    // chat/create로 takerId post하기
    await instance.post(`${SERVER_URL}/chat/create`, takerId);
  };
  const deleteData = async (content: any) => {
    const result_comment = await instance.delete(
      `${SERVER_URL}/sharing/application?sharingApplicationId=${param}` // 차후, sharing/application?sharingApplicationId=1로 변경
    );
    setPostComment(result_comment.data.content);
  };

  const postCommentInfo = () => {
    // 0. '신청하기' || '신청취소' 버튼 변경 기능
    const newButton = changeButton === false ? true : false;
    setChangeButton(newButton);

    const commentData = watch('postComment');
    const data = { content: commentData };

    if (newButton === true) {
      // 1. textarea 데이터를 '신청하기'버튼 클릭 시 submit
      fetchData(data);
    } else {
      // 2. 취소 버튼 클릭 시, Data delete
      deleteData(data);
    }
  };

  const [checkRoomId, setCheckRoomId] = useState([]);
  const [checkChatStatus, setCheckChatStatus] = useState<boolean>();
  const userData = instance.get(`${SERVER_URL}/user/info?userId=${param}`);
  // recoil로 user data
  const [getUserData, setGetUserData] = useRecoilState(userInfoState);

  useEffect(() => {
    const checkChatStatus = async () => {
      const { data } = await instance.get(`${SERVER_URL}/chat/enter`);
      console.log(`chatData: `, data);
      setCheckChatStatus(data.isOpened);
    };

    console.log(`getUserData.userId: `, getUserData.userId);
    // console.log(`checkChatStatus.takerId: `, checkChatStatus.takerId);

    // <Chat />에 roomId 적용하여
    if (
      changeButton === true
      // &&
      // checkChatStatus.takerId === getUserData.userId
    ) {
      // taker의 nickname을 알 수 있는 방법
      // setCheckRoomId(checkChatStatus.roomId);
      checkChatStatus();
    }
  }, []);

  console.log(watch('postComment'));

  return (
    <S.Container>
      {!changeButton && (
        <S.Form onSubmit={handleSubmit(fetchData)}>
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
            onClickHandler={postCommentInfo}
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
            onClickHandler={postCommentInfo}
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
      {changeButton && checkChatStatus && (
        <ChatRoomArea>
          <Chat roomId={checkRoomId} />
        </ChatRoomArea>
      )}
    </S.Container>
  );
}

export default CommentArea;
