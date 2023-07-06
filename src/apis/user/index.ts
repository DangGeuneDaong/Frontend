import { useRecoilState } from 'recoil';
import { userState } from '../../states/userInfo';
import { instance } from '../auth/api';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

export const getUserInfo = async (userId: string) => {
  try {
    const response = await instance.get(`/user/info?userId=${userId}`);
    console.log('response : ', response);
    return response.data;
  } catch (error) {
    console.log('error : ', error);
  }
};

export const userFetchInfo = async (userId: string) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    if (userId) {
      const query = useQuery(['userInfo', userId], () => getUserInfo(userId), {
        refetchOnWindowFocus: false,
      });

      if (query.data) {
        setUserInfo(query.data);
      }
    }
  }, [userId, setUserInfo]);

  console.log('userInfo : ', userInfo);

  return { userInfo };
};
