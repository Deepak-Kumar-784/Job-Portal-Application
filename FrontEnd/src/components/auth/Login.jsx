import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from '@/utils/constant';
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) { 
      console.log(error); 
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]); // Added `user` as a dependency

  return (
    <div>
      <Navbar />
      <div className="flex justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-lg p-6 shadow-md my-10 bg-gray-50"
        >
          <h1 className="font-bold text-2xl mb-6 text-gray-800">Login</h1>

          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abhigrace@gmail.com"
              className=" text-gray-400 w-full px-4 py-2 rounded-md border border-gray-300"
            />
          </div>

          <div className="my-4">
            <Label className="block font-medium mb-1 text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password "
              className="text-gray-400 w-full px-4 py-2 rounded-md border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-4 my-6">
            <RadioGroup className="flex gap-6 items-center">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="text-gray-700 cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="text-gray-700 cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Login
            </Button>
          )}

          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-800 underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
