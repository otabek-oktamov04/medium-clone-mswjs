import ArticlesHeader from "@/components/articles/articles-header/articles-header";
import Comments from "@/components/articles/comments/comments";
import {
  useGetArticleById,
  useGetArticles,
  useSaveArticle,
  useUnSaveArticle,
} from "@/react-query/hooks";
import { formatDate } from "@/utils/helpers/helpers";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CopyIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const ArticleView = () => {
  const { id } = useParams();
  const { data: article, refetch } = useGetArticleById(id || "");
  const { mutateAsync: saveArticle } = useSaveArticle();
  const { mutateAsync: unSaveArticle } = useUnSaveArticle();
  const { refetch: refetchRecommendedArticles } = useGetArticles(
    true,
    false,
    ""
  );
  const { refetch: refetchFollowedArticles } = useGetArticles(false, true, "");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const formattedDate = formatDate(article?.createdAt || "");

  if (!article) return null;

  const refetchAllArticles = () => {
    refetch();
    refetchRecommendedArticles();
    refetchFollowedArticles();
  };

  const handleSaveArticle = async () => {
    await saveArticle(article);
    refetchAllArticles();
  };

  const handleUnSaveArticle = async () => {
    await unSaveArticle(article);
    refetchAllArticles();
  };

  const toggleLike = () => setIsLiked((prev) => !prev);

  return (
    <div>
      <ArticlesHeader />
      <div className="max-w-3xl mt-16 mx-auto">
        <h2 className="text-3xl font-extrabold">{article?.title}</h2>

        <div className="mt-6 flex items-center gap-2">
          <img
            src={article?.author.image}
            className="w-10 rounded-full"
            alt="Author"
          />
          <div>
            <p className="font-medium text-sm">
              {article?.author.firstName}{" "}
              <span className="text-green-600 font-semibold">· Follow</span>
            </p>
            <p className="text-xs font-thin text-gray-400">
              4 min read <span>· {formattedDate}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-b py-2 flex items-center justify-between text-gray-500 px-4">
          <div className="flex text-gray-700 font-thin text-xs items-center gap-4">
            <span
              className="flex hover:text-black cursor-pointer items-center gap-2"
              onClick={toggleLike}
            >
              {isLiked ? (
                <FaThumbsUp className="text-lg" />
              ) : (
                <FaRegThumbsUp className="text-lg" />
              )}{" "}
              {isLiked ? article.claps + 1 : article.claps}
            </span>
            <span className="flex hover:text-black cursor-pointer items-center gap-2">
              <MessageCircleIcon
                onClick={() => setIsCommentsOpen(true)}
                className="w-4"
              />{" "}
              {article?.comments.length}
            </span>
          </div>

          <div className="flex gap-6 items-center">
            {article?.isSaved ? (
              <BookmarkCheckIcon
                onClick={handleUnSaveArticle}
                className="w-5 hover:text-black cursor-pointer"
              />
            ) : (
              <BookmarkIcon
                onClick={handleSaveArticle}
                className="w-5 hover:text-black cursor-pointer"
              />
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ShareIcon className="w-5 cursor-pointer hover:text-black" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 mt-4">
                <DropdownMenuItem className="bg-white flex shadow-md p-2 justify-between border-2 rounded-md items-center">
                  <span>Copy link</span>
                  <CopyIcon className="cursor-pointer" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="py-10">{article?.content}</p>

        <div className="flex items-center gap-4">
          {article?.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-100 px-4 py-2 cursor-pointer rounded-full text-sm font-medium"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <Comments
        articleId={article.id}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={article.comments}
      />
    </div>
  );
};

export default ArticleView;
