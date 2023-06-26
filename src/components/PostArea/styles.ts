import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  height: 300px;
  margin: 0 auto;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    width: 50px;
    height: 50px;

    margin-right: 5px;

    background-color: ${(props) => props.theme.color.red};
    border-radius: 50%;
  }

  > div:last-child {
    margin-left: auto;
    color: ${(props) => props.theme.color.red};
    ${(props) => props.theme.font.heading_md}
    margin-right: 5px;
  }

  padding-top: 5px;
  padding-bottom: 5px;
`;

export const PostContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.primary};
  border-top: 1px solid ${(props) => props.theme.color.primary};
`;

export const ProductName = styled.div`
  ${(props) => props.theme.font.heading_lg};

  + div {
    color: ${(props) => props.theme.color.gray};
  }
`;

export const FirstCategory = styled.span`
  ${(props) => props.theme.font.contents};
  color: ${(props) => props.theme.color.gray};
  margin-right: 1em;
`;

export const SecondCategory = styled.span`
  ${(props) => props.theme.font.contents};
  color: ${(props) => props.theme.color.gray};
  margin-left: 1em;
  margin-right: 1em;
`;

export const UploadTime = styled.span`
  ${(props) => props.theme.font.contents};
  color: ${(props) => props.theme.color.gray};
`;

export const ProductDetails = styled.div`
  min-height: calc(300px - 60px - 36px - 24px);
`;
