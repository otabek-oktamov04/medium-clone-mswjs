import ArticleCard from "@/components/articles/article-card/article-card";
import ArticlesHeader from "@/components/articles/articles-header/articles-header";
import UserCard from "@/components/user-card/user-card";
import { useSearch } from "@/react-query/hooks";
import { useGetSearchQuery } from "@/utils/helpers/helpers";
import { IArticle } from "@/utils/interfaces/article.interface";
import { IUser } from "@/utils/interfaces/user.interface";
import { useState } from "react";

enum Tab {
  ARTICLES = "RECOMMENDED",
  PEOPLE = "FOLLOWED",
}

const SearchResult = () => {
  const searchValue = useGetSearchQuery();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ARTICLES);
  const { data: searchResults } = useSearch(searchValue);

  const tabs = [
    { label: "Articles", value: Tab.ARTICLES },
    { label: "People", value: Tab.PEOPLE },
  ];

  const renderNoResultsMessage = (type: string) => (
    <p className="text-gray-500">No {type} found.</p>
  );

  const renderResults = () => {
    const results =
      activeTab === Tab.ARTICLES
        ? searchResults?.articles
        : searchResults?.users;

    if (!results || results.length === 0) {
      return renderNoResultsMessage(
        activeTab === Tab.ARTICLES ? "articles" : "users"
      );
    }

    return results.map((item: IArticle | IUser) => {
      return activeTab === Tab.ARTICLES ? (
        <ArticleCard key={item.id} article={item as IArticle} />
      ) : (
        <UserCard key={item.id} user={item as IUser} />
      );
    });
  };

  return (
    <div>
      <ArticlesHeader />
      <div className="border-r border-gray-300 min-h-screen max-w-screen-md pr-20 mx-auto">
        <h2 className="pt-20 text-4xl font-semibold text-gray-500">
          Results for <span className="text-black">{searchValue}</span>
        </h2>
        <div className="flex border-b mt-10 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`px-2 py-3 text-sm font-medium ${
                activeTab === tab.value
                  ? "text-gray-800 border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-6">{renderResults()}</div>
      </div>
    </div>
  );
};

export default SearchResult;
