import React, { useContext, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const AppSidebar = (props: Props) => {
  const [projectList, setProjectList] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [userDetail, setUserDetail] = useContext(UserDetailContext);

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div>
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <h2 className="font-bold">AI Website Builder</h2>
        </div>
        <Link href="/workspace" className="mt-5 w-full">
          <Button>+ Add New Project</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          {projectList.length === 0 && (
            <h2 className="text-sm px-2 text-gray-500">
              No projects available.
            </h2>
          )}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-2">
        <div className="p-3 border rounded-xl space-y-3 bg-secondary">
          <h2 className="flex justify-between items-center">
            Remaining Credits{" "}
            <span className="font-bold">{userDetail?.credits}</span>
          </h2>
          <Progress value={33} />
          <Button className="w-full">Upgrade to Unlimited</Button>
        </div>
        <div className="flex items-center gap-2">
          <UserButton />
          <Button variant={"ghost"}>Settings</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
