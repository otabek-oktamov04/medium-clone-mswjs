import { useGetMe } from "@/react-query/hooks";
import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import UserDropdown from "@/components/user-dropdown/user-dropdown";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EDITOR_KEY = "rnh0axi8gittbak67atz4djjsqyy01qe3iqkqphghk5dsdaj";

const ArticleEditor = () => {
  const { data: userInfo } = useGetMe();

  // Memoize editor config to avoid unnecessary re-renders
  const editorConfig = useMemo(
    () => ({
      height: 600,
      plugins:
        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
      toolbar:
        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      initialValue: "Welcome to TinyMCE!",
    }),
    []
  );

  return (
    <div className="max-w-screen-lg mx-auto">
      <header className="flex justify-between mt-5 items-center">
        <div className="flex items-end gap-3">
          <img src={logo} width={118} alt="Logo" />
          <span className="font-light text-xs">
            Draft in {userInfo?.firstName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            disabled
            className="rounded-full h-6 text-xs font-light bg-green-500"
          >
            Publish
          </Button>
          <BellIcon className="h-5 w-5 text-gray-500 hover:text-black cursor-pointer" />
          <UserDropdown />
        </div>
      </header>
      <form className="mt-12 px-20">
        <Label className="font-light">Article Title</Label>
        <Input placeholder="Title" className=" mb-4" />
        <Label className="font-light">Article Summary</Label>
        <Textarea placeholder="Summary" className=" mb-4" />
        <Editor apiKey={EDITOR_KEY} init={editorConfig} />
      </form>
    </div>
  );
};

export default ArticleEditor;
