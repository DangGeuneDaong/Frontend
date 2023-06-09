import Button from '../Button';
import * as S from './CommentArea.styles';

import React, { useState } from "react";
import { useForm } from 'react-hook-form';

import Textarea from '../Form/Textarea'

function CommentArea() {
  // let [userName] = useState('홍길동');
  // let [comment, setComment] = useState('');
  // let [feedComments, setFeedComments] = useState([]);
  // let [isValid, setIsValid] = useState(false);

  // 유효성 검사를 통과하고 '신청하기' 클릭 시 발생하는 함수 post 구현
  // let post = e => {
  //   const copyFeedComments = [...feedComments];
  //   copyFeedComments.push(comment);
  //   setFeedComments(copyfeedComments);
  //   setComment('');
  // }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch, // 실시간 값 감시 가능
  } = useForm({ mode: ‘onBlur’ });

  const getCommentInfo = () => {
    return console.log('1')
  }


  return (
    <S.Container>
      <S.CommentTextarea placeholder="궁금한 사항을 적어주세요!" />
      <Textarea
        type="text"
        label="이메일 *"
        errors={errors}
        {...register("email")}
      />
      <Button
        width={'90px'}
        height={'90px'}
        borderRadius={'10px'}
        onClickHandler={getCommentInfo}
        style={{
          margin: '5px 0px 5px 10px',
          lineHeight: '90px',
        }}
      >신청하기</Button>
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
function useForm(arg0: { mode: any; onBlur: any; }): { register: any; handleSubmit: any; setValue: any; formState: { errors: any; }; watch: any; } {
  throw new Error('Function not implemented.');
}

