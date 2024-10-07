import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";

interface IProps {
  onDeleteModalOpen: (e: MouseEvent<HTMLDivElement>) => void;
  articleId: string;
}

export default function ArticleOptionsDropdown({
  onDeleteModalOpen,
  articleId,
}: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className="h-5 w-5 hover:text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <Link to={`/article-edit/${articleId}/`}>
          <DropdownMenuItem>Edit story</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Pin this story to your profile</DropdownMenuItem>
        <DropdownMenuItem>Story settings</DropdownMenuItem>
        <DropdownMenuItem>Story stats</DropdownMenuItem>
        <DropdownMenuItem>Hide responses</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => onDeleteModalOpen(e)}
          className="text-red-600"
        >
          Delete story
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
