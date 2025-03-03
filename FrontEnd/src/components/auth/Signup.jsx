import { setLoading } from '@/redux/authSlice';
import axios from "axios";
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };


  //dusre page me bhejna he..!!
  const navigate = useNavigate();
  const {loading,user}=useSelector(store=>store.auth)
  const dispatch=useDispatch()




  const submitHandler = async (e) => {
    e.preventDefault();//so that page ll not refresh
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`https://job-portal-application-2-ilnb.onrender.com/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    finally{
      dispatch(setLoading(false))
    }
  };


    useEffect(()=>{
      if(user){
        navigate("/")
      }
    },[])
  
  return (
    <div>
      <Navbar />
      <div className="flex justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-lg p-6 shadow-md my-10 bg-gray-50"
        >
          <h1 className="font-bold text-2xl mb-6 text-gray-800">Sign Up</h1>
          {/* Input Fields */}
          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Abhigrace"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-400"
            />
          </div>
          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abhigrace@gmail.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-400"
            />
          </div>
          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="76810XXXXX"
              className="text-gray-400 w-full px-4 py-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="text-gray-400 w-full px-4 py-2 rounded-md border border-gray-300"
            />
          </div>
          {/* Role and File Input */}
          <div className="flex flex-col gap-4 my-6">
            <RadioGroup className="flex gap-6 items-center">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-700 cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-700 cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-4">
              <Label className="text-gray-700">Profile:</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer file:bg-gray-100 file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:text-gray-600"
              />
            </div>
          </div>
          {
            loading?<Button className="w-full my-4"><Loader2  className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:
            <Button
            type="submit"
            className="w-full my-4 bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Signup
          </Button>
          }
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 underline">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
