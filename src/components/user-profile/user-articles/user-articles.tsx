import ArticleCard from "@/components/articles/article-card/article-card";
import { useGetMyArticles } from "@/react-query/hooks";

export const UserArticles = () => {
  const { data } = useGetMyArticles();
  return (
    <div>
      {data?.map((item) => (
        <ArticleCard article={item} />
      ))}
    </div>
  );
};

export default UserArticles;
