import styled from 'styled-components';

const Container = styled.div`
  width: 800px;
  height: 800px;
  background-color: ${(props) => props.theme.color.primary};
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: gray;
`;

export default { Container, Image };
