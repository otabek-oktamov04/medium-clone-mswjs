import { BellIcon, PenSquare, SearchIcon, UserIcon } from "lucide-react";
import logo from "../../../assets/logo.svg";
import { IUser } from "@/utils/interfaces/user.interface";
import { useGetMe } from "@/react-query/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const getUserAvatarOrInitials = (user: IUser) => {
  if (user.image) {
    return (
      <img
        src={user.image}
        alt="User Avatar"
        className="w-full h-full object-cover rounded-full"
      />
    );
  }
  const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
  return (
    <span className="flex items-center justify-center w-full h-full">
      {initials}
    </span>
  );
};

const ArticlesHeader = () => {
  const { data: user } = useGetMe();

  return (
    <div className="w-full h-14 border-b px-6 flex items-center">
      <div className="flex gap-6 items-center">
        <img src={logo} width={112} />
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 w-64">
          <SearchIcon className="text-2xl" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 outline-none ml-2 w-full placeholder:text-gray-600 placeholder:text-sm font-semibold"
          />
        </div>
      </div>
      <div className="flex ml-auto gap-6">
        <button className="flex items-center gap-1 text-gray-500 text-sm hover:text-black">
          <PenSquare className="text-2xl" />
          Write
        </button>
        <button className="text-2xl text-gray-500">
          <BellIcon />
        </button>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-700 text-white">
                {getUserAvatarOrInitials(user)}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60 font-medium text-gray-600 mr-4 p-3 shadow-md">
              <Link to="/profile">
                <DropdownMenuItem className="flex items-center gap-4 cursor-pointer p-2 ">
                  <UserIcon /> Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default ArticlesHeader;
