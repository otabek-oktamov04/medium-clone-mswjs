import { BellIcon, PenSquare, SearchIcon, UserIcon } from "lucide-react";
import logo from "../../../assets/logo.svg";

import { useGetMe } from "@/react-query/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetSearchQuery } from "@/utils/helpers/helpers";

const ArticlesHeader = () => {
  const searchTerm = useGetSearchQuery();
  const [searchValue, setSearchValue] = useState(searchTerm);
  const { data: user } = useGetMe();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  return (
    <div className="w-full h-14 border-b px-6 flex items-center">
      <div className="flex gap-6 items-center">
        <img src={logo} width={112} />
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 w-64">
          <SearchIcon className="text-2xl" />
          <input
            type="search"
            placeholder="Search"
            defaultValue={searchTerm}
            className="bg-gray-50 outline-none ml-2 w-full placeholder:text-gray-600 placeholder:text-sm font-semibold"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
                {user.image ? (
                  <img
                    src={user.image}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  user.firstName[0]
                )}
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
