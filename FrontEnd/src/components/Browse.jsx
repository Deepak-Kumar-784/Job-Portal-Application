import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-8 px-6">
      {/* Navbar */}
      <Navbar />

      {/* Search Results Heading */}
      <h1 className="font-bold text-2xl text-gray-800 my-6">
        Search Results <span className="text-blue-600">({allJobs.length})</span>
      </h1>

      {/* Job Grid */}
      {allJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300 p-5"
            >
              <Job job={job} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">No jobs found. Try another search.</p>
      )}
    </div>
  );
};

export default Browse;
