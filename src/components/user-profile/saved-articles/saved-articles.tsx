import ArticleCard from "@/components/articles/article-card/article-card";
import { useGetSavedArticles } from "@/react-query/hooks";

export const SavedArticles = () => {
  const { data: savedArticles } = useGetSavedArticles();

  return (
    <div className="flex flex-col">
      {savedArticles?.map((item) => (
        <ArticleCard article={item} key={item.id} />
      ))}
    </div>
  );
};
