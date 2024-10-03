import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IComment } from "@/utils/interfaces/article.interface";
import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  useCreateSubComment,
  useGetArticleById,
  useGetMe,
} from "@/react-query/hooks";

interface IProps {
  comment: IComment;
  articleId: string;
}

const LIKES_COUNT = 2;

const CommentCard = ({ comment, articleId }: IProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { mutateAsync, isPending } = useCreateSubComment();
  const { refetch } = useGetArticleById(articleId);
  const { data: user } = useGetMe();

  const toggleLike = () => setIsLiked((prev) => !prev);
  const toggleReply = () => setShowReplyForm((prev) => !prev);
  const handleToggleReplies = () => setShowReplies((prev) => !prev);

  const likeCount = isLiked ? LIKES_COUNT + 1 : LIKES_COUNT;

  const handleReplySubmit = async () => {
    if (user)
      await mutateAsync({
        articleId,
        commentId: comment.id,
        comment: {
          text: commentText,
          author: user,
        },
      });
    toggleReply();
    refetch();
  };

  return (
    <div className="p-2 border-b pb-4">
      <CommentHeader comment={comment} />
      <div className="flex px-2 text-sm">{comment.text}</div>
      <CommentFooter
        comments={comment.replies || []}
        likeCount={likeCount}
        isLiked={isLiked}
        toggleLike={toggleLike}
        showReplies={showReplies}
        handleToggleReplies={handleToggleReplies}
        toggleReply={toggleReply}
      />
      {showReplyForm && (
        <ReplyForm
          commentText={commentText}
          setCommentText={setCommentText}
          onReplySubmit={handleReplySubmit}
          isPending={isPending}
          toggleReply={toggleReply}
        />
      )}
      {showReplies && (
        <RepliesList replies={comment.replies || []} articleId={articleId} />
      )}
    </div>
  );
};

const CommentHeader = ({ comment }: { comment: IComment }) => (
  <div className="mb-4 flex items-center gap-2 text-sm font-medium">
    <Avatar>
      <AvatarImage src={comment.author?.avatarUrl} />
      <AvatarFallback>{comment.author.firstName[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p>{`${comment.author.firstName} ${comment.author.lastName}`}</p>
      <p className="text-xs">{comment.author.info}</p>
    </div>
  </div>
);

const CommentFooter = ({
  likeCount,
  isLiked,
  toggleLike,
  showReplies,
  handleToggleReplies,
  toggleReply,
  comments,
}: {
  likeCount: number;
  isLiked: boolean;
  toggleLike: () => void;
  showReplies: boolean;
  handleToggleReplies: () => void;
  toggleReply: () => void;
  comments: IComment[];
}) => (
  <div className="footer px-2 mt-4 flex items-center justify-between">
    <div className="flex items-center gap-6">
      <div className="flex text-sm gap-2 cursor-pointer" onClick={toggleLike}>
        {isLiked ? (
          <FaThumbsUp className="text-lg" />
        ) : (
          <FaRegThumbsUp className="text-lg" />
        )}
        {likeCount}
      </div>
      <div
        onClick={handleToggleReplies}
        className="flex text-sm items-center gap-1 cursor-pointer"
      >
        <MessageCircle className="w-5 font-medium" />
        {showReplies ? "Hide Replies" : `replies (${comments?.length})`}
      </div>
    </div>
    <p className="text-sm font-medium cursor-pointer" onClick={toggleReply}>
      Reply
    </p>
  </div>
);

const ReplyForm = ({
  commentText,
  setCommentText,
  onReplySubmit,
  isPending,
  toggleReply,
}: {
  commentText: string;
  setCommentText: (text: string) => void;
  onReplySubmit: () => Promise<void>;
  isPending: boolean;
  toggleReply: () => void;
}) => (
  <div className="flex flex-col ml-5 mt-5 shadow-md rounded-md">
    <Textarea
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="What are your thoughts?"
      className="min-h-[100px]"
    />
    <div className="flex w-full justify-end p-2">
      <Button
        variant="outline"
        onClick={toggleReply}
        className="mr-2 border-none rounded-full h-8 px-4"
      >
        Cancel
      </Button>
      <Button
        onClick={onReplySubmit}
        disabled={!commentText || isPending}
        className="bg-[#1a8917] rounded-full h-8 hover:bg-[#1a8917]"
      >
        Respond
      </Button>
    </div>
  </div>
);

const RepliesList = ({
  replies,
  articleId,
}: {
  replies: IComment[];
  articleId: string;
}) => (
  <div className="flex flex-col ml-5 mt-10 border-l-4">
    {replies?.map((reply) => (
      <CommentCard articleId={articleId} key={reply.id} comment={reply} />
    ))}
  </div>
);

export default CommentCard;
