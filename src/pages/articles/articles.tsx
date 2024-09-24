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
        return (
          <div>
            <h2 className="text-xl font-bold">For You Content</h2>
            <p>This is the content for the "For You" tab.</p>
          </div>
        );
      case Tab.FOLLOWED:
        return (
          <div>
            <h2 className="text-xl font-bold">Following Content</h2>
            <p>This is the content for the "Following" tab.</p>
          </div>
        );
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
      <div className="p-4">{renderContent()}</div>
    </div>
  );
};

export default Articles;
