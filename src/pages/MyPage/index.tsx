import axios from 'axios';

import { FaUser } from 'react-icons/fa';

import MainTemplate from '../../components/template/MainTemplate';
import Button from '../../components/Button';

import * as S from './styles';

function MyPage() {
  const profileUrl =
    'https://www.thechooeok.com/common/img/default_profile.png';
  return (
    <MainTemplate>
      <S.Container>
        <S.SubContainer>
          <S.UpdateContainer>
            <S.UserContainer>
              <S.Span>프로필 수정</S.Span>
              <S.ProfileImg src={profileUrl} />
              <h3>닉네임</h3>
            </S.UserContainer>
          </S.UpdateContainer>

          <S.ListContainer>
            <S.Breadcrumb>전체 | 나눔완료 | 나눔 받은 글</S.Breadcrumb>
            <S.List>
              <S.Post>
                <S.PostInfos>
                  <S.PostImg src={profileUrl} />
                  <S.Description>
                    <S.DescriptionUp>
                      <h3>고양이 전용 털 빗 나눔해요~</h3>
                      <span>2023-04-22</span>
                    </S.DescriptionUp>

                    <S.DescriptionDown>
                      <S.Nums>경기도 용인시 수지구</S.Nums>
                      <S.Nums>
                        <FaUser /> 120
                      </S.Nums>
                    </S.DescriptionDown>
                  </S.Description>
                </S.PostInfos>

                <S.UpdatePost>
                  <Button
                    type="button"
                    styleType="primary"
                    borderRadius="20px"
                    hoverStyle="font-weight:800"
                  >
                    나눔완료
                  </Button>
                  <S.PostInfo>
                    <S.UpdateBtn>수정</S.UpdateBtn>
                    <S.UpdateBtn>삭제</S.UpdateBtn>
                  </S.PostInfo>
                </S.UpdatePost>
              </S.Post>
            </S.List>
          </S.ListContainer>
        </S.SubContainer>
      </S.Container>
    </MainTemplate>
  );
}

export default MyPage;
