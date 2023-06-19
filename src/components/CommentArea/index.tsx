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
  const [comment, setComment] = useState<string>(''); // 댓글 작성


  // textarea 데이터를 '신청하기'버튼 클릭 시 submit
  const { register, handleSubmit, formState: { errors }, watch, // 실시간 값 감시 가능
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  const fetchData = async (content: any) => {
    const SERVER_URL = 'http://localhost:5000'
    const result_comment = await axios.post(`${SERVER_URL}/takerlists`, content)
    setComment(result_comment.data.content)
    console.log(result_comment.data.content)
  }

  const getCommentInfo = () => {
    // 1. textarea 데이터를 '신청하기'버튼 클릭 시 submit
    // 1.1. 취소 버튼 클릭 시, Data delete
    const commentData = watch('comment');
    setComment(commentData)
    console.log(commentData)

    const newButton = changeButton === false ? true : false;
    setChangeButton(newButton)

    const data = { content: commentData }
    fetchData(data)
  };


  console.log(watch('comment'));

  return (
    <S.Container>
      {!changeButton &&
        <S.Form onSubmit={handleSubmit(fetchData)}>
          <Textarea
            placeholder={'궁금한 사항을 적어주세요!'}
            errors={errors}
            containerType="content"
            {...register('comment')}
            name={'content'}
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
        </Button>}
      {/* <input
        type='text'
        placeholder='궁금한 사항을 적어주세요!' onChange={e => {
          setComment(e.target.value);
        }}
        onKeyUp={e => {
          e.target.value.length > 0
            ? setIsValid(true)
            : setIsValid(false)
        }}
        value={comment}
      />
      <button
        type='button'
        onClick={post}
        disabled={isValid ? false : true}
      >
        신청하기
      </button> */}
    </S.Container >
  );
}

export default CommentArea;
