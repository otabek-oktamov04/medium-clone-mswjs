import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetMe, useUpdateUser } from "@/react-query/hooks";

export default function AboutSection() {
  const { data: userInfo } = useGetMe();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(userInfo?.bio || "");

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  if (!userInfo) return null;

  const handleSave = async () => {
    try {
      await updateUser({ ...userInfo, bio: text });
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally, add user feedback here
    } finally {
      setIsEditing(false);
    }
  };

  const EditSection = () => (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-2xl font-serif p-0 h-auto border-none focus-visible:ring-0 focus-visible:outline-none"
      />
      <div className="flex items-center gap-2 !mt-10">
        <div className="flex-grow mt-10" />
        <Button
          variant="outline"
          className="h-9 rounded-full border-black"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="h-9 rounded-full" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );

  const ViewSection = () => (
    <div className="flex items-end flex-col justify-end">
      <p className="text-2xl font-serif text-left w-full">{text}</p>
      <Button
        variant="outline"
        className="border border-black rounded-full h-9 px-4 mt-10"
        onClick={handleEdit}
      >
        Edit
      </Button>
    </div>
  );

  return isEditing ? <EditSection /> : <ViewSection />;
}
