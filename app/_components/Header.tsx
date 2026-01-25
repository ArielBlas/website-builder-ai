import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const MenuOptions = [
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between p-4 shadow">
      {/* Logo  X */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
        <h2 className="font-bold text-xl">Website Builder AI</h2>
      </div>
      {/* Menu Optinos */}
      <div className="flex gap-3">
        {MenuOptions.map((menu, index) => (
          <Button variant={"ghost"} key={index}>
            {menu.name}
          </Button>
        ))}
      </div>
      {/* Get Started Button */}
      <div>
        <Button>
          <SignInButton mode="modal" forceRedirectUrl={"/workspace"}>
            Get Started <ArrowRight />
          </SignInButton>
        </Button>
      </div>
    </div>
  );
};

export default Header;
