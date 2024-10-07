import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/utils/helpers/helpers";
import { IArticle } from "@/utils/interfaces/article.interface";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  MessageCircleIcon,
  SparkleIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import ArticleOptionsDropdown from "./article-options-dropdown/article-options-dropdow";
import ArticleDeleteConfirmation from "./article-delete-confirmation/article-delete-confirmation";
import { MouseEvent, useState } from "react";

interface IProps {
  article: IArticle;
  isAuthor?: boolean;
}

const ArticleCard = ({ article, isAuthor }: IProps) => {
  const formattedDate = formatDate(article.createdAt);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <Link to={`/article/${article.id}`}>
        <div className="py-4 border-b">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="flex items-center hover:underline gap-2 text-xs font-medium">
                  <img
                    width={30}
                    className="rounded-full"
                    src={article.author.image}
                  />
                  {article.author.firstName} in {article.author.info}
                </p>
              </TooltipTrigger>
              <TooltipContent className="shadow-md p-4 max-w-56" align="start">
                <div className="flex justify-between items-center">
                  <img
                    className="w-12 rounded-full"
                    src={article.author.image}
                  />{" "}
                  <Button size="sm" className="rounded-full h-7">
                    Follow
                  </Button>
                </div>
                <h2 className="mt-4 font-medium">{article.author.firstName}</h2>
                <p className="mt-2 text-xs">{article.author.bio}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between items-center">
            <div className="w-2/3">
              <h2 className="mt-2 text-xl font-extrabold">{article.title}</h2>
              <p className="text-sm mt-2 font-normal text-gray-700">
                {article.summary}
              </p>
              <div className="mt-4 text-xs text-gray-600 flex justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <SparkleIcon className="w-4 text-yellow-500 cursor-pointer" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1 cursor-pointer">
                    <ThumbsUpIcon className="w-4" /> {article.claps}
                  </span>
                  <span className="flex items-center gap-1 cursor-pointer">
                    <MessageCircleIcon className="w-4" />{" "}
                    {article.comments.length}
                  </span>
                </div>
                <span className="flex items-center gap-2">
                  {article.isSaved ? (
                    <BookmarkCheckIcon className="w-5 cursor-pointer" />
                  ) : (
                    <BookmarkIcon className="w-5 cursor-pointer" />
                  )}

                  {isAuthor && (
                    <ArticleOptionsDropdown onDeleteModalOpen={onOpen} />
                  )}
                </span>
              </div>
            </div>
            <img width={200} height={100} src={article.thumbnail} />
          </div>
        </div>
      </Link>
      <ArticleDeleteConfirmation
        articleId={article.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ArticleCard;
