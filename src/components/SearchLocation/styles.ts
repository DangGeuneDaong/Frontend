import styled from 'styled-components';

export const AddressSearchButton = styled.button`
  border: 1px solid ${(props) => props.theme.color.lightGray};
  width: 20%;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  &:hover {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
  margin-left: 3px;
  margin-top: 1px;
`;
