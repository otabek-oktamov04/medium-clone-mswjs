import { useGetTopics } from "@/react-query/hooks";
import ProfileCard from "../profile-card/profile-card";
import { ITopic } from "@/utils/interfaces/article.interface";

const ArticlesSidebar = () => {
  const { data: topics } = useGetTopics();

  return (
    <div className="w-1/4 border-l p-6 ">
      <h2 className="text-lg font-medium mb-4">Recommended topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics?.slice(0, 5).map((item: ITopic) => (
          <div
            key={item.id}
            className="bg-gray-100 px-4 py-2 cursor-pointer rounded-full text-sm font-medium"
          >
            {item.name}
          </div>
        ))}
      </div>
      <p className="text-sm px-2 font-medium mt-4 text-lime-700">
        See more topics
      </p>

      <h2 className="text-lg font-medium mb-4 mt-10">Who to follow</h2>
      <div className="flex w-full ">
        <ProfileCard
          name="John Doe"
          avatarUrl="https://picsum.photos/200/300?random=1"
          bio="Chemist"
          verified
        />
      </div>
    </div>
  );
};

export default ArticlesSidebar;
