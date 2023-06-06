import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 700px;
  height: 400px;
  background-color: blue;
  margin: 0 auto;
  color: white;

  position: relative;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;

  width: 35px;
  height: 35px;
  padding: 0;
  border-radius: 50%;

  color: white;

  cursor: pointer;

  box-shadow: 0px 4px 60px 20px rgba(3, 3, 3, 0.9),
    inset 0 --3em 3em rgba(3, 3, 3, 0.5);
  transform: translate(0, -50%);

  ${(props) =>
    props.right === true
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
        `}
`;

const Title = styled.h3`
  font-size: 18px;

  position: absolute;
  bottom: 5%;
  left: 50%;

  color: white;

  box-shadow: 0px 4px 10px 15px rgba(3, 3, 3, 0.9),
    inset 0 --3em 3em rgba(3, 3, 3, 0.5);
  transform: translate(-50%, 0);
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 5px;
  position: absolute;
  bottom: 3%;
  left: 50%;

  transform: translate(-50%, 0);
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;

  ${(props) =>
    props.active === true
      ? css`
          background-colr: white;
        `
      : css`
          background-color: grey;
        `}
`;

const UnorderedList = styled.ul``;

const List = styled.li`
  display: inline-block;

  width: 30px;
  height: 50px;

  text-align: center;
  line-height: 50px;

  &:hover {
    background-color: gray;
    opacity: 0.8;
  }
`;

export default { Container, ImageContainer, Button, Title, DotContainer, Dot };
