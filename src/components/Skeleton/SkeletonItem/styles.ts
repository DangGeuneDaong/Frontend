import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px 28px;
  width: 100%;
  min-height: 265px;
  border-bottom: 1px solid rgba(0,0,0,0.1);

  &:last-child {
    border-bottom: none;
  }
`;

export const Status = styled.div`
  margin-bottom: 4px;
  width: 42px;
  height: 12px;
  border-radius: 4px;
  background-color: #ddd;
`;

export const Title = styled.h2`
  width: 240px;
  height: 18px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: #ddd;
`;

export const Location = styled.div`
  width: 180px;
  height: 14px;
  border-radius: 4px;
  background-color: #ddd;
`;

export const ImageCarousel = styled.div`
  margin-top: 20px;
  height: 158px;
  border-radius: 6px;
  background-color: #ddd;
`;

const loading = keyframes`
  100% {
    transform: translate(1250%);
  }
`
export const Shimmer = styled.div`
  width: 8%;
  height: 100%;
  background-color: rgba(255,255,255,0.15);

  animation: ${loading} 0.85s infinite;
`;

