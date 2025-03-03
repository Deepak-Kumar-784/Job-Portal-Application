import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Avatar } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import Navbar from "./shared/Navbar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Profile Container */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-md">
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-300">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <Pen className="h-5 w-5" />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-blue-600" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-6">
          <h1 className="font-medium text-lg text-gray-800">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="bg-black text-white hover:bg-black px-3 py-1">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-bold text-gray-800 ">Resume : </Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h1 className="font-bold text-xl text-gray-800 my-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
