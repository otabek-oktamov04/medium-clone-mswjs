import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useArticleDelete } from "@/react-query/hooks";
import { toast } from "react-toastify";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
}

export default function ArticleDeleteConfirmation({
  isOpen,
  onClose,
  articleId,
}: IProps) {
  const { mutateAsync, isPending } = useArticleDelete();

  const onDeleteClick = async () => {
    await mutateAsync(articleId);
    toast.success("Article Deleted");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-screen-md py-44 px-20 ">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-3xl font-medium">
            Delete story
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Deletion is not reversible, and the story will be completely
            deleted. If you do not want to delete, you can{" "}
            <a href="#" className="text-primary underline">
              unlist the story
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-28 rounded-full"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDeleteClick}
            disabled={isPending}
            className="w-28 bg-red-700 rounded-full"
          >
            {isPending ? "Deleting.." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
