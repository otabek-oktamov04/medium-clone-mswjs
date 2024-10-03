import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MoveUpRight } from "lucide-react";
import { useGetMe, useUpdateUser } from "@/react-query/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Inputs {
  image: FileList;
  name: string;
  pronouns: string;
  shortBio: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [photo, setPhoto] = useState<string>("");
  const { data: userInfo } = useGetMe();
  const { mutateAsync } = useUpdateUser();

  // Watch form values for character counts
  const watchName = watch("name");
  const watchPronouns = watch("pronouns");
  const watchShortBio = watch("shortBio");

  useEffect(() => {
    if (userInfo?.image) setPhoto(userInfo.image);
  }, [userInfo?.image]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      image: photo,
      firstName: data.name,
      info: data.pronouns,
      bio: data.shortBio,
    });
    onClose();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => setPhoto("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-medium">
            Profile Information
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Photo */}
          <div className="space-y-2">
            <Label>Photo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl overflow-hidden">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userInfo?.firstName[0]
                )}
              </div>
              <div className="space-y-1">
                <div className="flex space-x-2 mb-4">
                  <Label
                    htmlFor="photo"
                    className="text-sm text-green-600 cursor-pointer"
                  >
                    Update
                  </Label>
                  <button
                    type="button"
                    onClick={handlePhotoRemove}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels
                  per side.
                </p>
              </div>
            </div>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="name">Name*</Label>
            <Input
              id="name"
              defaultValue={userInfo?.firstName}
              {...register("name", { required: "Name is required" })}
              className="mt-1 bg-gray-100"
            />
            <div className="flex justify-between text-xs text-red-500 mt-1">
              <span>{errors.name?.message}</span>
              <span>{watchName?.length || 0}/50</span>
            </div>
          </div>

          {/* Pronouns Input */}
          <div>
            <Label htmlFor="pronouns">Pronouns</Label>
            <Input
              id="pronouns"
              defaultValue={userInfo?.info}
              {...register("pronouns")}
              className="mt-1 bg-gray-100"
              placeholder="Add..."
            />
            <div className="flex justify-end text-xs text-gray-500 mt-1">
              <span>{watchPronouns?.length || 0}/40</span>
            </div>
          </div>

          {/* Short Bio Input */}
          <div>
            <Label htmlFor="shortBio">Short Bio</Label>
            <Textarea
              id="shortBio"
              defaultValue={userInfo?.bio}
              {...register("shortBio")}
              className="mt-1 bg-gray-100"
              rows={4}
            />
            <div className="flex justify-end text-xs text-gray-500 mt-1">
              <span>{watchShortBio?.length || 0}/160</span>
            </div>
          </div>

          {/* About Page Section */}
          <div className="pt-4 flex items-start justify-between">
            <div className="w-5/6">
              <Label className="text-sm text-gray-600">About Page</Label>
              <p className="text-xs text-gray-500">
                Personalize with images and more to create a vivid portrait of
                yourself beyond the "Short Bio."
              </p>
            </div>
            <MoveUpRight className="w-4 mt-4 text-gray-500 h-4" />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white border text-green-500 border-green-500 rounded-full hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
