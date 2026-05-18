import React from "react";

type PropsType = {
  if?: unknown;
  else?: React.ReactNode;
  children: React.ReactNode;
};

export const ConditionalRender: React.FC<PropsType> = (
  { children, if: condition, else: elseRenderContent = null },
  // eslint-disable-next-line react/jsx-no-useless-fragment
) => (!condition ? <>{elseRenderContent}</> : <>{children}</>);
