import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <Table className="w-full">
        <TableCaption className="text-gray-600 text-md mt-2">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-gray-700 text-left">Date</TableHead>
            <TableHead className="text-gray-700">Job Role</TableHead>
            <TableHead className="text-gray-700">Company</TableHead>
            <TableHead className="text-gray-700 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                <TableCell className="text-gray-700">
                  {appliedJob.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-gray-700 font-medium">
                  {appliedJob.job.title}
                </TableCell>
                <TableCell className="text-gray-700">
                  {appliedJob.job.company.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500 hover:bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-gray-500 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-500"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
