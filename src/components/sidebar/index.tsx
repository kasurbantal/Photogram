import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, ImagePlus, User, GalleryHorizontal } from "lucide-react";

interface ISidebarProps {}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Post",
    link: "/post",
    icon: ImagePlus,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: User,
  },
  {
    name: "My Photos",
    link: "/myphotos",
    icon: GalleryHorizontal,
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
          const Icon = item.icon;

          return (
            <Link
              to={item.link}
              key={item.name}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                isActive
                  ? "bg-slate-800 text-white hover:bg-white hover:text-slate-800"
                  : "bg-transparent text-gray-400 hover:bg-slate-700 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-white group-hover:text-black"
                    : "text-white group-hover:text-black"
                )}
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
