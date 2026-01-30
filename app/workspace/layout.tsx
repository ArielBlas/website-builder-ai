import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./_components/AppSidebar";

type Props = {
  children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};

export default WorkspaceLayout;
