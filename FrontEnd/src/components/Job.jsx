import { toggleBookmark } from "@/redux/jobSlice"; // Redux action
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get saved jobs (bookmarked jobs) from Redux
    const { savedJobs = [] } = useSelector((store) => store.job || {}); // ✅ Fixed variable name and default value

    // Check if the job is already bookmarked
    const isBookmarked = savedJobs.some((item) => item._id === job._id);

    const handleBookmark = () => {
        dispatch(toggleBookmark(job)); // Dispatch action to add/remove bookmark
    };

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Unknown"; // ✅ Prevents errors if `createdAt` is missing
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
            {/* Date & Bookmark */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="ghost"
                    className="rounded-full hover:bg-gray-100"
                    size="icon"
                    onClick={handleBookmark} // Call function on click
                >
                    {isBookmarked ? (
                        <BookmarkCheck className="text-blue-600" />
                    ) : (
                        <Bookmark className="text-gray-600 hover:text-gray-900" />
                    )}
                </Button>
            </div>

            {/* Company Logo & Name */}
            <div className="flex items-center gap-4 my-4">
                <Avatar className="w-14 h-14 border border-gray-300 shadow-md">
                    <AvatarImage src={job?.company?.logo || "/default-logo.png"} /> {/* ✅ Default image to avoid broken logos */}
                </Avatar>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">{job?.company?.name || "Unknown Company"}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-xl text-gray-800 mb-2">{job?.title || "Untitled Job"}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">{job?.description || "No description available."}</p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full">
                    {job?.position || 0} Positions
                </Badge>
                <Badge className="text-[#F83002] font-semibold bg-red-100 px-3 py-1 rounded-full">
                    {job?.jobType || "N/A"}
                </Badge>
                <Badge className="text-[#7209b7] font-semibold bg-purple-100 px-3 py-1 rounded-full">
                    {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
                </Badge>
            </div>

            {/* Details Button */}
            <div className="flex justify-end mt-5">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default Job;
