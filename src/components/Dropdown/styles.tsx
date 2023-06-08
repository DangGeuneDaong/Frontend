import styled from 'styled-components';
import { DropdownCSSProps } from '.';

export const DropdownContainer = styled.div<DropdownCSSProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${(props) => (props.listWidth ? `${props.listWidth}px` : props.width)};
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 15px;
`;

export const SelectedItem = styled.div`
  width: 100%;
  height: 30px;
  z-index: 1;
`;
export const SelectedItemLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2px 0;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-left: 10px;
  }

  .dropdownIcon {
    min-width: 15px;
    margin-right: 10px;
    margin-left: 2px;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% - 4px);
  left: -1px;
  width: 100%;
  width: fit-content;
  min-width: calc(100% + 2px);
  padding-top: 5px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e6e6e6;

  visibility: hidden;
  pointer-events: none;

  &.show {
    visibility: visible;
    pointer-events: auto;
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  padding: 5px 27px 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #ffeaaa;
  }
`;
