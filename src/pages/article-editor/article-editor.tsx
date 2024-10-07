import {
  useCreateArticle,
  useGetArticleById,
  useGetMe,
  useUpdateArticle,
} from "@/react-query/hooks";
import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import UserDropdown from "@/components/user-dropdown/user-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { IArticle } from "@/utils/interfaces/article.interface";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EDITOR_KEY = "rnh0axi8gittbak67atz4djjsqyy01qe3iqkqphghk5dsdaj";

const ArticleEditor = () => {
  const { data: userInfo } = useGetMe();
  const { articleId } = useParams<{ articleId: string }>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<IArticle>();
  const [isContentEmpty, setIsContentEmpty] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const { mutateAsync, isPending } = useCreateArticle();
  const { data: articleInfo } = useGetArticleById(articleId || "");
  const { mutateAsync: updateArticle, isPending: isUpdatePending } =
    useUpdateArticle();

  const navigate = useNavigate();

  const contentValue = watch("content");

  // Editor configuration
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

  // Form submission handler
  const onSubmit: SubmitHandler<IArticle> = async (data) => {
    const articleData = { ...data, thumbnail: thumbnailPreview };
    if (articleId) {
      await updateArticle({ id: articleId, value: articleData });
      toast.success("Article Updated");
    } else {
      await mutateAsync(articleData);
      toast.success("Article Created");
    }
    navigate("/");
  };

  // Effect to set initial values from article info
  useEffect(() => {
    if (articleInfo) {
      setThumbnailPreview(articleInfo.thumbnail || "");
      setValue("content", articleInfo.content || "");
      setValue("title", articleInfo.title);
      setValue("summary", articleInfo.summary);
      setValue("thumbnail", articleInfo.thumbnail);
    }
  }, [articleInfo, setValue]);

  // Effect to check if content is empty
  useEffect(() => {
    setIsContentEmpty(!contentValue?.trim());
  }, [contentValue]);

  // Handle thumbnail change
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview("");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="flex justify-between mt-5 items-center mb-12">
          <div className="flex items-end gap-3">
            <img src={logo} width={118} alt="Logo" />
            <span className="font-light text-xs">
              Draft in {userInfo?.firstName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              disabled={isContentEmpty || isPending || isUpdatePending}
              type="submit"
              className="rounded-full h-7 hover:bg-green-700 text-xs font-light bg-green-500"
            >
              {isPending ? "Publishing..." : "Publish"}
            </Button>
            <BellIcon className="h-5 w-5 text-gray-500 hover:text-black cursor-pointer" />
            <UserDropdown />
          </div>
        </header>

        <div className="px-20">
          <Label className="font-light">Article Title</Label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            defaultValue={articleInfo?.title}
          />
          <p className="text-red-500 text-xs mb-4">{errors.title?.message}</p>

          <Label className="font-light">Article Summary</Label>
          <Textarea
            {...register("summary", { required: "Summary is required" })}
            defaultValue={articleInfo?.summary}
            placeholder="Summary"
          />
          <p className="text-red-500 text-xs mb-4">{errors.summary?.message}</p>

          <Label className="font-light">Thumbnail</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            onChange={handleThumbnailChange}
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mb-4 w-32 h-32 object-cover"
            />
          )}

          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Editor
                apiKey={EDITOR_KEY}
                init={editorConfig}
                value={value}
                onEditorChange={onChange}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;
