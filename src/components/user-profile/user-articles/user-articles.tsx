import ArticleCard from "@/components/articles/article-card/article-card";
import { useGetMyArticles } from "@/react-query/hooks";

export const UserArticles = () => {
  const { data } = useGetMyArticles();
  return (
    <div>
      {data?.length ? (
        data.map((item) => <ArticleCard isAuthor article={item} />)
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default UserArticles;
