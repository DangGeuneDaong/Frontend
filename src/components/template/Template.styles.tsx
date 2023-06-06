import styled from 'styled-components';

const TemplateContainer = styled.div`
  width: 100%;
`;

const TemplateInner = styled.div`
  max-width: 1800px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin: 0 auto;
`;

export default { TemplateContainer, TemplateInner };
