import axios from 'axios';
import Button from '../Button'
import * as S from './styles'
import { useEffect, useState } from 'react';

interface OfferPageProps {
}

function EditArea() {
  const [postStatus, setPostStatus] = useState<string>('')

  const SERVER_URL = 'http://localhost:5000'
  const fetchData = async () => {
    // const { data } = await axios.post(`${SERVER_URL}/Good`)
    // setPostStatus(data)
  }
  fetchData()

  return (
    <S.Container>
      <Button>삭제하기</Button>
      <Button>수정하기</Button>
      <form onSubmit={fetchData}>
        <Button>나눔완료</Button>
      </form>
    </S.Container>
  )
}

export default EditArea