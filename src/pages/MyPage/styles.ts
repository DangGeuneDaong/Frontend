import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubContainer = styled.div`
  width: 90%;
  height: 90%;
  border: 3px solid ${(props) => props.theme.color.gray};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UpdateContainer = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const UserContainer = styled.div`
  width: 100%;
  height: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2.5;
`;
export const Span = styled.span`
  align-self: flex-end;
  margin-right: 20px;
`;

export const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Breadcrumb = styled.div`
  margin-left: 3.5rem;
  align-self: flex-start;
`;

export const BreadcrumbSpan = styled.span`
  cursor: pointer;
  margin-left: 3px;
`;

export const Title = styled.h3`
  cursor: pointer;
  & :hover {
    text-decoration: underline;
  }
`;

export const List = styled.div`
  width: 90%;
  height: 100%;
`;

export const Post = styled.div`
  width: 100%;
  height: 130px;
  border: 1px solid ${(props) => props.theme.color.gray};
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PostInfos = styled.div`
  display: flex;
  width: 80%;
`;
export const PostImg = styled.img`
  width: 260px;
  height: 100%;
`;
export const Description = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  line-height: 30px;
  margin-left: 10px;
`;
export const DescriptionUp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescriptionDown = styled.div`
  display: flex;
`;
export const Nums = styled.span`
  color: gray;
  display: flex;
  align-items: center;
  margin-right: 5px;
`;
export const PostInfo = styled.div`
  display: flex;
`;

export const UpdatePost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-right: 10px;
`;

export const UpdateBtn = styled.button`
  width: 50%;
  height: 100%;
  padding: 5px;
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 15px;
  &:hover {
    font-weight: 500;
  }
`;
