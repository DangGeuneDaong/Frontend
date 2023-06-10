import Button from '../Button';
import * as S from './styles';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Textarea from '../Form/Textarea';

interface CommentAreaProps {
  setProps: (comment: string) => void;
}

function CommentArea({ setProps }: CommentAreaProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch, // 실시간 값 감시 가능
  } = useForm();

  const getCommentInfo = () => {
    const formData = watch('comment');
    setProps(formData);
  };

  console.log(watch('comment'));

  return (
    <S.Container>
      <Textarea
        errors={errors}
        {...register('comment')}
        width={'590px'}
        style={{
          height: '90px',
          margin: '',
        }}
      />
      <Button
        width={'90px'}
        height={'90px'}
        borderRadius={'10px'}
        onClickHandler={getCommentInfo}
        style={{
          lineHeight: '90px',
          margin: '',
        }}
      >
        신청하기
      </Button>
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
    </S.Container>
  );
}

export default CommentArea;
