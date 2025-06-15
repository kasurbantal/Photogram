import * as React from "react";
import HomeIcon from "@/assets/icons/home.svg";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ISidebarProps {}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="flex flex-col relative h-screen w-64 bg-[#1E293B] p-4">
      <div className="text-white text-2xl font-semibold mb-8 text-center">
        PhotoGram
      </div>

      <div className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link
              to={item.link}
              key={item.name}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "bg-transparent text-gray-400 hover:bg-slate-700 hover:text-white"
              )}
            >
              <img
                src={item.icon}
                alt={item.name}
                className={cn("w-5 h-5", isActive ? "invert brightness-0" : "")}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
