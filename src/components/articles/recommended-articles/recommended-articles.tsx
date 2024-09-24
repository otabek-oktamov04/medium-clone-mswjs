import { useGetArticles } from "@/react-query/hooks";
import { IArticle } from "@/utils/interfaces/article.interface";
import ArticleCard from "../article-card/article-card";

const RecommendedArticles = () => {
  const { data: articles } = useGetArticles(true, false, "");

  return (
    <div>
      {articles?.map((item: IArticle) => (
        <ArticleCard article={item} />
      ))}
    </div>
  );
};

export default RecommendedArticles;
