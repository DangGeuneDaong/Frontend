import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  border-bottom: 1px solid #e5e5e5;
  background-color: ${(props) => props.theme.color.primary};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  margin: 0 auto;
`;

export const HeaderRightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
