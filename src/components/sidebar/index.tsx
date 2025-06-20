import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, ImagePlus, User, GalleryHorizontal, LogOut } from "lucide-react";
import { useUserAuth } from "@/context/userAuthContext";

interface ISidebarProps {}

const navItems = [
  { name: "Home", link: "/", icon: Home },
  { name: "Post", link: "/post", icon: ImagePlus },
  { name: "Profile", link: "/profile", icon: User },
  { name: "My Photos", link: "/myphotos", icon: GalleryHorizontal },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin logout?");
    if (!confirmed) return;

    try {
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex flex-col justify-between h-screen w-64 bg-[#1E293B] p-4">
      <div>
        <div className="text-white text-2xl font-semibold mb-8 text-center">
          PhotoGram
        </div>

        <div className="flex flex-col space-y-2">
          {navItems.map(({ name, link, icon: Icon }) => {
            const isActive = pathname === link;

            return (
              <Link
                to={link}
                key={name}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                  isActive
                    ? "bg-white text-slate-800"
                    : "bg-transparent text-white hover:bg-slate-700"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-slate-800" : "text-white"
                  )}
                />
                <span className="text-sm font-medium">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 px-4 py-3 rounded-md bg-transparent text-white hover:bg-red-500 hover:text-white transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </nav>
  );
};

export default Sidebar;
