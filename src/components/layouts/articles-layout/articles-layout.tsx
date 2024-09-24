import ArticlesHeader from "@/components/articles/articles-header/articles-header";
import ArticlesSidebar from "@/components/articles/articles-sidebar/articles-sidebar";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ArticlesLayout = ({ children }: IProps) => {
  return (
    <div className="h-screen w-full">
      <ArticlesHeader />
      <div className="flex w-full">
        <div className="w-3/4">{children}</div>
        <ArticlesSidebar />
      </div>
    </div>
  );
};

export default ArticlesLayout;
