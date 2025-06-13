import * as React from "react";
import HomeIcon from "@/assets/icons/home.svg";
import { Link } from "react-router-dom";

interface ISidebarProps {}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  return (
    <>
      <nav className="flex flex-col space-x-2 relative h-screen max-w-sm w-full">
        <div className="flex justify-center m-5">
          <div className="text-white text-lg">PhotoGram</div>
        </div>
        {navItems.map((item) => (
          <div className="" key={item.name}>
            <Link to={item.link}>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
