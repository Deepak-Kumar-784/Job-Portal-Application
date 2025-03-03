import { setSingleCompany } from "@/redux/companySlice";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch=useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:8002/api/v1/company/register",
        { companyName: companyName }, // Ensure correct key if API expects `name`
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, 
        }
      );
  
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error("Error registering company:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
  }
  
  };
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2  border-black  text-gray-400 "
          placeholder="JobHunt, Microsoft etc."
          onChange={(e)=>setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="bg-white text-black hover:bg-white"
          >
            Cancel
          </Button>
          <Button
            className="bg-black text-white hover:bg-black"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
