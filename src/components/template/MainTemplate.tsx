import React from "react";

interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  return <div>{children}</div>;
}

export default MainTemplate;
