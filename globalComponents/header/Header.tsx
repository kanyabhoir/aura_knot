import { menus } from "@/utils/Menus";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserProfile from "./components/UserProfile";
import HomePage from "@/app/page";


const Header = () => {
  return (
    <div className="flex items-center justify-between border-2 h-20 px-20 container mx-auto sticky top-0">
        {/* logo */}
      <div>
        <Image src={"/header/Logo.svg"} alt="logo" width={104} height={20} className="object-contain"/>
      </div>
      
      {/* menu */}
      <div className="flex gap-4 ">
        {menus.map((item, index) => (
          <div key={index}>
            <Link href={item.link}>{item.menu}</Link>
          </div>
        ))}
      </div>
      {/* user info */}
      <div>
        <UserProfile/>
      </div>
    </div>
  );
};

export default Header;
