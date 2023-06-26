import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 700px;
  height: 400px;
  margin: 10px auto 0;
  color: white;

  position: relative;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  border-radius: 10px;
`;

export const Button = styled.button<{ right?: boolean }>`
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
    props.right
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
        `};
`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 5px;
  position: absolute;
  bottom: 3%;
  left: 50%;

  transform: translate(-50%, 0);
`;
export const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;

  background-color: ${(props) => (props.active === true ? 'white' : 'grey')};
`;
