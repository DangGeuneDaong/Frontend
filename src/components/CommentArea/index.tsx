import Button from '../Button';
import * as S from './styles';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components'

import Textarea from '../Form/Textarea';

interface CommentAreaProps {
  setProps: (comment: string) => void;
}

function CommentArea({ setProps }: CommentAreaProps) {
  // theme 속 styled-components를 사용하기 위해 useTheme 선언
  const theme = useTheme();

  const [changeButton, setChangeButton] = useState(false)


  // textarea 데이터를 '신청하기'버튼 클릭 시 submit
  const { register, handleSubmit, formState: { errors }, watch, // 실시간 값 감시 가능
  } = useForm();

  const getCommentInfo = () => {
    // 1. textarea 데이터를 '신청하기'버튼 클릭 시 submit
    // 1.1. 취소 버튼 클릭 시, Data delete
    const formData = watch('comment');
    setProps(formData);

    const newButton = changeButton === false ? true : false;
    setChangeButton(newButton)
  };

  console.log(watch('comment'));

  return (
    <S.Container>
      {!changeButton &&
        <S.Form onSubmit={handleSubmit(async (data: any) => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log(JSON.stringify(data))
        })}>
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
