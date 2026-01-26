"use client";
import React from "react";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const CreateNewUser = () => {};
  return <div>{children}</div>;
}

export default Provider;
