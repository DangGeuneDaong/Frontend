import styled from 'styled-components';

const Container = styled.div`
  width: 800px;
  height: fit-content;
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: gray;
`;

export default { Container, Image };
