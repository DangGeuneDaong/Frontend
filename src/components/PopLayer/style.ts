import styled from 'styled-components';
import { PopLayerCSSProps } from '.';

export const Container = styled.div`
  position: relative;
`;

export const ListContainer = styled.ul<PopLayerCSSProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  min-width: 220px;
  padding: 6px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.primary};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  min-width: fit-content;
  min-height: 36px;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  &.hover {
    background-color: rgba(248, 191, 82, 0.2);
  }
`;
