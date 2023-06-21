import Button from '../Button';
import * as S from './styles';

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components'

import Textarea from '../Form/Textarea';


function CommentArea() {
  // theme 속 styled-components를 사용하기 위해 useTheme 선언
  const theme = useTheme();

  const [changeButton, setChangeButton] = useState(false)
  const [postComment, setPostComment] = useState<string>(''); // 댓글 Post 요청하기
  const [deleteComment, setDeleteComment] = useState<string>(''); // 댓글 Post 요청 취소하기


  // textarea 데이터를 '신청하기'버튼 클릭 시 submit
  const { register, handleSubmit, formState: { errors }, watch, // 실시간 값 감시 가능
  } = useForm();

  const SERVER_URL = 'http://localhost:5000'
  const fetchData = async (content: any) => {
    const result_comment = await axios.post(`${SERVER_URL}/Sharing_Application`, content, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
    setPostComment(result_comment.data.content)
  }
  const deleteData = async (content: any) => {
    const result_comment = await axios.delete(`${SERVER_URL}/Sharing_Application`)
    setPostComment(result_comment.data.content)
  }

  const getCommentInfo = () => {
    // 0. '신청하기' || '신청취소' 버튼 변경 기능
    const newButton = changeButton === false ? true : false;
    setChangeButton(newButton)

    const commentData = watch('postComment');
    const data = { content: commentData }

    if (newButton === true) {
      // 1. textarea 데이터를 '신청하기'버튼 클릭 시 submit
      fetchData(data)
    } else {
      // 2. 취소 버튼 클릭 시, Data delete
      deleteData(data)
    }
  };


  console.log(watch('postComment'));

  return (
    <S.Container>
      {!changeButton &&
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
            onClickHandler={getCommentInfo}
            style={{
              lineHeight: '90px',
            }}
          >
            신청하기
          </Button>
        </S.Form>
      }
      {changeButton &&
        <S.Form onSubmit={handleSubmit(deleteData)}>
          <Button
            height={'90px'}
            borderRadius={'10px'}
            onClickHandler={getCommentInfo}
            style={{
              backgroundColor: 'white',
              borderColor: `${theme.color.red}`,
              fontSize: '30px',
            }}
          >
            신청취소
          </Button>
        </S.Form>}
    </S.Container >
  );
}

export default CommentArea;
