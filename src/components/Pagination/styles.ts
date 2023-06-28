import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  > button {
    padding-left: 8px;
    padding-right: 8px;

    border: none;
    border-radius: 10px;

    background: ${(props) => props.theme.color.lightRed};

    color: white;
  }
  > button:hover {
    background: ${(props) => props.theme.color.red};
    cursor: pointer;
    transform: translateY(-2px);
  }
  > button[disabled] {
    background: ${(props) => props.theme.color.gray};
    cursor: revert;
    transform: revert;
  }
  > button[aria-current] {
    background: ${(props) => props.theme.color.lightGray};
    cursor: revert;
    transform: revert;
  }
`;
