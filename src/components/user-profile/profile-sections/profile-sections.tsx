import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useGetMe } from "@/react-query/hooks";
import AboutSection from "../about-section/about-section";
import { SavedArticles } from "../saved-articles/saved-articles";
import UserArticles from "../user-articles/user-articles";

export default function ProfileSections() {
  const [activeTab, setActiveTab] = useState("Home");
  const { data: userInfo } = useGetMe();

  const tabs = ["Home", "Saved", "About"];

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <UserArticles />;
      case "Saved":
        return <SavedArticles />;
      case "About":
        return <AboutSection />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <header className="mb-8 mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">
            {userInfo?.firstName} {userInfo?.lastName}
          </h1>
          <button className="text-gray-500">
            <MoreHorizontal size={24} />
          </button>
        </div>
        <nav className="flex space-x-6 text-sm border-b ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-md   ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main>{renderContent()}</main>
    </div>
  );
}
