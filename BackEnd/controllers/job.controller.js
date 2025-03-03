import Job from "../models/job.model.js";

//job post by admin
export const postJob=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;

        if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId){
            return res.status(400).json({
                message:"Please fill all the fields",
                success:false
            })
        }

        const job=await Job.create({
            title,
            description,
            requirements,
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId

        })

        return res.status(201).json({
            message:"Job posted successfully",
            job,
            success:true,
        })
        
        
    } catch (error) {
        console.log(error);
    }
}
//student
export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };

        
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});


        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
//student
export const getJobById=async (req,res)=>{
    try {
       // console.log('API hit');
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"application"//to link applicant id
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        //console.log(job);
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//admin kitne job create kara he

export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs = await Job.find({ created_by: adminId })  // Filtering jobs by admin
        .populate("company")  // Populating company details
        .sort({ createdAt: -1 }); // Sorting should be outside populate()
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}




