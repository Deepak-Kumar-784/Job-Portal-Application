import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, // Import DialogDescription
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"; // Ensure DialogDescription is imported
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
    //console.log(input)
    setOpen(false);
    
  };

  return (
    <Dialog open={open}>
     <DialogContent
  className="sm:max-w-[500px] p-6 rounded-lg shadow-lg border border-gray-200"
  onInteractOutside={() => setOpen(false)}
>
  <DialogHeader>
    <DialogTitle className="text-xl font-semibold text-gray-800">
      Update Profile
    </DialogTitle>
  </DialogHeader>

  <DialogDescription className="text-sm text-gray-600">
    Use this dialog to update your profile details, including name, email, phone, bio, skills, and resume.
  </DialogDescription>

  <form onSubmit={submitHandler}>
    <div className="grid gap-5 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right font-medium text-gray-700">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="fullname"
          className="col-span-3 p-2 border border-gray-300 rounded-md"
          value={input.fullname}
          onChange={changeEventHandler}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right font-medium text-gray-700">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          className="col-span-3 p-2 border border-gray-300 rounded-md"
          value={input.email}
          onChange={changeEventHandler}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="number" className="text-right font-medium text-gray-700">
          Phone
        </Label>
        <Input
          id="number"
          name="phoneNumber"
          className="col-span-3 p-2 border border-gray-300 rounded-md"
          value={input.phoneNumber}
          onChange={changeEventHandler}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="bio" className="text-right font-medium text-gray-700">
          Bio
        </Label>
        <Input
          id="bio"
          name="bio"
          className="col-span-3 p-2 border border-gray-300 rounded-md"
          value={input.bio}
          onChange={changeEventHandler}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="skills" className="text-right font-medium text-gray-700">
          Skills
        </Label>
        <Input
          id="skills"
          name="skills"
          className="col-span-3 p-2 border border-gray-300 rounded-md"
          value={input.skills}
          onChange={changeEventHandler}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="file" className="text-right font-medium text-gray-700">
          Resume
        </Label>
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          onChange={fileChangeHandler}
          className="col-span-3 cursor-pointer p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    <DialogFooter>
      {loading ? (
        <Button className="w-full my-4 bg-gray-500 cursor-not-allowed">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full my-4 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-medium py-2 rounded-md"
        >
          Save Changes
        </Button>
      )}
    </DialogFooter>
  </form>
</DialogContent>

    </Dialog>
  );
};

export default UpdateProfileDialog;
