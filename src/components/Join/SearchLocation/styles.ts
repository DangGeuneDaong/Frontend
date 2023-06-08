import styled from 'styled-components';

// export const;

export const AddressSearchButton = styled.button`
  border: 1px solid ${(props) => props.theme.color.lightGray};
  width: 20%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &:hover {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
  margin-top: -10px;
  margin-bottom: 10px;
`;
