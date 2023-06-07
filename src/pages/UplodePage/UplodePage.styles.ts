import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: calc(1080px + 24px * 2);
  padding: 0 24px;
  margin: 88px auto 50px;
`;

export const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  padding: 32px 34px;
`;

export const Title = styled.p`
  ${(props) => props.theme.font.heading_sm};
  margin-bottom: 5px;
`;

export const InputContainer = styled.div`
  padding: 14px 0;
  border-top: 3px solid ${(props) => props.theme.color.primary};
  /* border-bottom: 3px solid ${(props) => props.theme.color.primary}; */
`;

export const HashtagContainer = styled.div`
  margin-bottom: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0 8px;
`;
