import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        // Create the company (ensure this step is executed and company is saved in DB)
        company = await Company.create({
            name: companyName,
            userID: req.id  // Assuming req.id is the logged-in user's ID
        });

        // Ensure the response is sent after the company is created
        return res.status(200).json({
            message: "Company created successfully",
            success: true,
            company
        });

    } catch (error) {
        console.error("Error during company registration:", error.message);  // Log the error message
        return res.status(500).json({
            message: `Something went wrong: ${error.message}`,  // Return detailed error message
            success: false
        });
    }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
       // console.log("Logged-in User ID:", userId); // Debugging

        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing.",
                success: false
            });
        }

        const companies = await Company.find({ userID: userId });

       // console.log("Fetched Companies:", companies); // Debugging

       if (!companies || companies.length === 0) {
        return res.status(200).json({ success: true, companies: [] });  // Return empty array
    }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getCompanyById=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }

            return res.status(200).json({
                company,
                success:true
            })
    } catch (error) {
        console.log(error)
    }
}


export const updateCompany=async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;
        //idhar cloudnary ayega baad me
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateCompany={name,description,website,location,logo}
        
        const company=await Company.findByIdAndUpdate(req.params.id,updateCompany,{new:true})

        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company information updated",
            success:true
        })

        

    } catch (error) {
        console.log(error);
    }
}  