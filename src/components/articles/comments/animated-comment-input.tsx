import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold as BoldIcon, Italic as ItalicIcon } from "lucide-react";
import { useComment, useGetArticleById, useGetMe } from "@/react-query/hooks";

interface IProps {
  articleId: string;
}

export default function AnimatedCommentInput({ articleId }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { refetch } = useGetArticleById(articleId);
  const { mutateAsync: createComment, isPending } = useComment();
  const [comment, setComment] = useState("");
  const { data: user } = useGetMe();

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setComment("");
  };

  const handleSubmit = async () => {
    await createComment({
      id: articleId,
      comment: {
        text: comment,
        author: user,
      },
    });
    setIsExpanded(false);
    refetch();
  };

  return (
    <div className="max-w-2xl mx-auto shadow-md">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="border rounded-lg p-3 text-sm cursor-text"
              onClick={handleExpand}
            >
              <p className="text-gray-500">What are your thoughts?</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border rounded-lg p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center mb-4"
              >
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                  <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  {user.firstName} {user.lastName}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="min-h-[100px] mb-4"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-center"
              >
                <div>
                  <Button variant="outline" size="icon" className="mr-2">
                    <BoldIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ItalicIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="mr-2 border-none rounded-full h-8 px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!comment || isPending}
                    className="bg-[#1a8917] rounded-full h-8 hover:bg-[#1a8917]"
                  >
                    Respond
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
