import FollowedArticles from "@/components/articles/followed-articles/followed-articles";
import RecommendedArticles from "@/components/articles/recommended-articles/recommended-articles";
import React, { useState } from "react";

enum Tab {
  RECOMMENDED = "RECOMMENDED",
  FOLLOWED = "FOLLOWED",
}

const Articles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.RECOMMENDED);

  const tabs = [
    { label: "For you", value: Tab.RECOMMENDED },
    { label: "Following", value: Tab.FOLLOWED },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case Tab.RECOMMENDED:
        return <FollowedArticles />;
      case Tab.FOLLOWED:
        return <RecommendedArticles />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-screen-md mt-10 ml-auto mr-32">
      {/* Tab buttons */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 text-sm font-medium ${
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

      {/* Content below the tabs */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default Articles;
