import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--footer-height);
  background-color: ${(props) => props.theme.color.lightGray};
`;

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  width: 100%;
  max-width: 1240px;
  padding: 0 16px;
  text-align: center;
  font-size: 16px;
`;
