import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, Menu, User2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-gray-900 text-2xl font-extrabold">
          Job<span className="text-blue-500">Hunt</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="text-gray-900" />
          </Button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex items-center gap-6 font-medium text-gray-700 ${menuOpen ? "flex flex-col space-y-3 bg-white p-4 absolute right-0 top-16 shadow-lg rounded-lg" : "hidden md:flex"}`}
        >
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies" className="hover:text-blue-500">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-blue-500">
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-blue-500">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-blue-500">
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Authentication Buttons or Profile */}
        {!user ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-gray-400 text-gray-900 hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer border-2 border-blue-500">
                <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-72 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-gray-600">
                {user && user.role === "student" && (
                  <div className="flex items-center gap-2">
                    <User2 className="text-blue-500" />
                    <Link to="/profile" className="hover:text-blue-700">View Profile</Link>
                  </div>
                )}
                <div className="flex items-center gap-2 cursor-pointer" onClick={logoutHandler}>
                  <LogOut className="text-red-500" />
                  <span className="text-red-500 hover:text-red-700">Logout</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;