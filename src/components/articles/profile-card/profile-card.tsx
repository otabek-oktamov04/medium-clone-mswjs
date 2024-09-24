import { Button } from "@/components/ui/button";
import { VerifiedIcon } from "lucide-react";
import React from "react";

interface IProps {
  name: string;
  avatarUrl: string;
  bio: string;
  verified?: boolean;
}

const ProfileCard: React.FC<IProps> = ({
  name,
  avatarUrl,
  bio,
  verified = false,
}) => {
  return (
    <div className="flex items-center w-full space-x-4 p-2  rounded-lg max-w-sm">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Name and verified badge */}
        <div className="flex items-center space-x-2">
          <h2 className="font-medium">{name}</h2>
          {verified && (
            <span className="text-blue-500">
              <VerifiedIcon />
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-500 text-ellipsis whitespace-nowrap">
          {bio}
        </p>
      </div>

      {/* Follow Button */}

      <Button variant="outline" className="rounded-full">
        Follow
      </Button>
    </div>
  );
};

export default ProfileCard;
