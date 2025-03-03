import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-10 bg-gray-100">
      <div className="flex flex-col gap-5 max-w-3xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-red-100 text-red-600 font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700">
          "Looking for your dream job? We’ve got you covered—find, apply, and get hired!"
        </p>

        <div className="flex w-full md:w-[60%] shadow-md border border-gray-300 rounded-full items-center gap-3 bg-white px-4 py-2 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-2 text-gray-800"
          />
          <Button
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            onClick={searchJobHandler}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
