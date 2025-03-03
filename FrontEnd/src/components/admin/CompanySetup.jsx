import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CompanySetup = () => {
  
  const params = useParams();
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany} = useSelector(store=>store.company); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${COMPANY_API_END_POINT}/update/${params.id}`
, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
      });
      if (res.data.success) {
          toast.success(res.data.message);
          navigate("/admin/companies");
      }
  }catch (error) {
    console.error("Error:", error);  // Log the full error for debugging
    toast.error(error.response?.data?.message || "Something went wrong");
}
 finally {
      setLoading(false);
  }};

  useEffect(()=>{
    setInput({
      name: singleCompany.name||"",
      description: singleCompany.description||"",
      website: singleCompany.website||"",
      location: singleCompany.location||"",
      file:singleCompany.file||""
    })
  },[singleCompany])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-white font-semibold bg-black hover:bg-gray-800 rounded-xl px-4 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <Label className="text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <Label className="text-gray-700">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <Label className="text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-gray-700">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full mt-1 border-gray-300 focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled
              className="w-full my-4 bg-black text-white py-3 rounded-xl font-semibold transition flex items-center justify-center opacity-75 cursor-not-allowed"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-black text-white hover:bg-gray-800 py-3 rounded-xl font-semibold transition"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
