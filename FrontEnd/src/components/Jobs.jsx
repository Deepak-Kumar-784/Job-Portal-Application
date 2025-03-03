import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedFilter, setSelectedFilter] = useState("");

    // Function to handle filter changes
    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);
    };

    useEffect(() => {
        let filteredJobs = allJobs;

        // Apply search filter if searchedQuery exists (Case-insensitive)
        if (searchedQuery) {
            const lowerCaseQuery = searchedQuery.toLowerCase();
            filteredJobs = filteredJobs.filter((job) =>
                job.title.toLowerCase().includes(lowerCaseQuery) ||
                job.description.toLowerCase().includes(lowerCaseQuery) ||
                job.location.toLowerCase().includes(lowerCaseQuery) ||
                job.salary.toString().toLowerCase().includes(lowerCaseQuery)
            );
        }

        // Apply filter based on selected location or industry (Case-insensitive)
        if (selectedFilter) {
            const lowerCaseFilter = selectedFilter.toLowerCase();
            filteredJobs = filteredJobs.filter(
                (job) =>
                    job.location.toLowerCase() === lowerCaseFilter || // Location filter
                    job.title.toLowerCase() === lowerCaseFilter || // Job title filter
                    job.jobType.toLowerCase() === lowerCaseFilter // Industry filter (Fix ✅)
            );
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, selectedFilter]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-7">
                <div className="flex gap-5">
                    {/* Filter Card */}
                    <div className="w-1/5">
                        <FilterCard onFilterChange={handleFilterChange} />
                    </div>
                    {/* Job List */}
                    <div className="flex-1 h-[88vh] overflow-y-auto p-5">
                        {filterJobs.length === 0 ? (
                            <span className="text-gray-500 text-lg">No jobs available</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <Job job={job} key={job?._id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
