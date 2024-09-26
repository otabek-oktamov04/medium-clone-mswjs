import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { IComment } from "@/utils/interfaces/article.interface";
import { ShieldCheckIcon, XIcon } from "lucide-react";
import AnimatedCommentInput from "./animated-comment-input";
import CommentCard from "./comment-card";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
  articleId: string;
}

const MEDIUM_RULES = "https://policy.medium.com/medium-rules-30e5502c4eb4";

const Comments = ({ isOpen, onClose, comments, articleId }: IProps) => {
  return (
    <Drawer direction="right" open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Responses ({comments.length})</DrawerTitle>
          <div className="flex gap-4 items-center">
            <a href={MEDIUM_RULES} target="_blank">
              <ShieldCheckIcon className="w-5" />
            </a>
            <DrawerClose>
              <XIcon />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="p-4 border-b mb-6">
          <AnimatedCommentInput articleId={articleId} />
        </div>
        {comments.map((item) => (
          <CommentCard comment={item} articleId={articleId} key={item.id} />
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default Comments;
