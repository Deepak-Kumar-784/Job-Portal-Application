import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-300"
        >
            {/* Company Name & Location */}
            <div className="mb-4">
                <h1 className="font-semibold text-lg text-gray-900">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-xl text-gray-800 mb-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap gap-3 mt-5">
                <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-semibold bg-red-100 px-3 py-1 rounded-full">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-semibold bg-purple-100 px-3 py-1 rounded-full">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
