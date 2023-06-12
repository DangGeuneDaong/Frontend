import styled from 'styled-components';

export const TemplateContainer = styled.div`
  width: 100%;
`;

export const TemplateInner = styled.div`
  max-width: 1800px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin: 0 auto;
`;
