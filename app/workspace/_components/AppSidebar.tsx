import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const AppSidebar = (props: Props) => {
  const [projectList, setProjectList] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useContext(UserDetailContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    GetProjectList();
  }, []);

  const GetProjectList = async () => {
    setLoading(true);
    const result = await axios.get("/api/get-all-projects");
    console.log(result.data);
    setProjectList(result.data);
    setLoading(false);
  };

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
          {!loading && projectList.length === 0 && (
            <h2 className="text-sm px-2 text-gray-500">
              No projects available.
            </h2>
          )}
          <div>
            {!loading && projectList.length > 0
              ? projectList.map((project, index) => (
                  <Link
                    href={`/playground/${project.projectId}?frameId=${project.framesId}`}
                    key={index}
                    className="my-2 hover:bg-secondary p-2 rounded-lg cursor-pointer"
                  >
                    <h2 className="line-clamp-1">
                      {project?.chats[0].chatMessage[0]?.content}
                    </h2>
                  </Link>
                ))
              : [1, 2, 3, 4, 5].map((_, index) => (
                  <Skeleton
                    className="w-full h-10 rounded-lg mt-2 "
                    key={index}
                  />
                ))}
          </div>
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
          <Link href="/workspace/ pricing" className="w-full">
            <Button className="w-full">Upgrade to Unlimited</Button>
          </Link>
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
