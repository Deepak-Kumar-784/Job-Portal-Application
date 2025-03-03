import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-5'>
            <h1 className='text-4xl font-bold  mb-6'>
                <span className='text-blue-600'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    allJobs.length === 0 ? (
                        <span className='text-gray-500 text-lg'>No Job Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default LatestJobs;