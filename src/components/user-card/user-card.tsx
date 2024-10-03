import { IUser } from "@/utils/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  return (
    <div className="flex items-center border-b border-gray-200 p-4 py-7">
      <div>
        <Avatar className="w-14 h-14">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.firstName[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="ml-6">
        <h2 className="font-medium">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-xs">{user.info}</p>
      </div>
      <Button className="bg-green-600 ml-auto hover:bg-green-700 rounded-full">
        Follow
      </Button>
    </div>
  );
};

export default UserCard;
