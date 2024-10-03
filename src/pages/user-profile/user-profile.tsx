import ArticlesHeader from "@/components/articles/articles-header/articles-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMe } from "@/react-query/hooks";
import ProfileSections from "../../components/user-profile/profile-sections/profile-sections";
import { useState } from "react";
import ProfileModal from "@/components/user-profile/profile-modal/profile-modal";

const footerLinks = [
  { href: "https://medium.statuspage.io/", label: "Status" },
  { href: "https://about.medium.com", label: "About" },
  { href: "https://medium.com/careers", label: "Careers" },
  { href: "https://medium.com/press", label: "Press" },
  { href: "https://help.medium.com", label: "Help", hiddenOnMobile: true },
  { href: "https://blog.medium.com", label: "Blog", hiddenOnMobile: true },
  { href: "https://medium.com/policy/privacy-policy", label: "Privacy" },
  { href: "https://medium.com/policy/terms-of-service", label: "Terms" },
];

const UserProfile = () => {
  const { data: userInfo, refetch } = useGetMe();
  const [isOpen, setIsOpen] = useState(false);

  const onProfileModalClose = () => {
    setIsOpen(false);
    refetch();
  };

  return (
    <div>
      <div className="fixed w-full bg-white z-50">
        <ArticlesHeader />
      </div>
      <div className="flex pt-14">
        <div className="user-info w-4/6 ">
          <ProfileSections />
        </div>
        <div className="user-info w-2/6 flex min-h-screen fixed right-0 flex-col  border-l p-6">
          <div className="info">
            <Avatar className="w-20 h-20 text-3xl font-medium ">
              <AvatarImage src={userInfo?.image} />
              <AvatarFallback className="bg-blue-500 text-white">
                {userInfo?.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 font-medium">
              {userInfo?.firstName} {userInfo?.lastName}
            </h2>
            <p className="text-xs mt-2 font-medium">{userInfo?.info}</p>
            <p className="mt-2 text-xs">{userInfo?.bio}</p>
            <p
              className="text-xs text-[#1a8917] mt-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Edit Profile
            </p>
          </div>
          <div className="footer flex gap-4 flex-wrap mt-[55vh]">
            {footerLinks.map((item, index) => (
              <a key={index} href={item.href} className="text-xs text-gray-600">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <ProfileModal isOpen={isOpen} onClose={onProfileModalClose} />
    </div>
  );
};

export default UserProfile;
