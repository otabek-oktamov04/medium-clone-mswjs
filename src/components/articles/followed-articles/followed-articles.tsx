import { useGetArticles } from "@/react-query/hooks";
import { IArticle } from "@/utils/interfaces/article.interface";
import ArticleCard from "../article-card/article-card";

const FollowedArticles = () => {
  const { data: articles } = useGetArticles(false, true, "");

  return (
    <div>
      {articles?.map((item: IArticle) => (
        <ArticleCard key={item.id} article={item} />
      ))}
    </div>
  );
};

export default FollowedArticles;
