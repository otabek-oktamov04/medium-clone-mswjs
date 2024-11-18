import { BellIcon, PenSquare, SearchIcon } from "lucide-react";
import logo from "../../../assets/logo.svg";

import { useGetMe } from "@/react-query/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetSearchQuery } from "@/utils/helpers/helpers";
import UserDropdown from "@/components/user-dropdown/user-dropdown";

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
      navigate(`/search?searchQuery=${searchValue}`);
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
            className="bg-gray-50 outline-none ml-2 w-full placeholder:text-gray-600 placeholder:text-sm font-light"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="flex items-center ml-auto gap-6">
        <Link to="/new-article">
          <button className="flex items-center gap-1 text-gray-500 text-xs font-light hover:text-black">
            <PenSquare className="text-xl" />
            Write
          </button>
        </Link>
        <button className="text-2xl text-gray-500">
          <BellIcon />
        </button>
        {user && <UserDropdown />}
      </div>
    </div>
  );
};

export default ArticlesHeader;
