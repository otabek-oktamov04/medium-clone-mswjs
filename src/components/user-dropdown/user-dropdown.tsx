import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMe } from "@/react-query/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Write", link: "/new" },
  { label: "Profile", link: "/profile" },
  { label: "Library" },
  { label: "Stories" },
  { label: "Stats" },
  { label: "Settings" },
  { label: "Refine recommendations" },
  { label: "Manage publications" },
  { label: "Help" },
  { label: "Apply to the Partner Program" },
  { label: "Become a member", className: "text-green-600" },
  { label: "Sign out" },
];

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userInfo } = useGetMe();

  return (
    <header className="flex items-center justify-between bg-white">
      <div className="flex items-center space-x-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="w-8 h-8 text-xs">
              <AvatarImage src={userInfo?.image} />
              <AvatarFallback className="bg-blue-800 text-white">
                {userInfo?.firstName[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center space-x-2 p-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userInfo?.firstName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {userInfo?.info}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            {menuItems.map((item, index) =>
              item.link ? (
                <Link key={index} to={item.link}>
                  <DropdownMenuItem className={item.className}>
                    {item.label}
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem key={index} className={item.className}>
                  {item.label}
                </DropdownMenuItem>
              )
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
