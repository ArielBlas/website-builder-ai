import React from "react";

type Props = {
  children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default WorkspaceLayout;
