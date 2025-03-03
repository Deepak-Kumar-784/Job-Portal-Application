import { Application } from "../models/application.model.js";
import Job from "../models/job.model.js";


export const  applyJob=async(req,res)=>{
   try {
    const userId=req.id;
    const jobId=req.params.id;
    if(!jobId){
        return res.status(400).json({message:"Job id is required",success:false});
    }
    //check if the user has already applied for the job
    const existingApplication=await Application.findOne({job:jobId,applicant:userId});

    if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this job",
            success:false
        });
    }


    //check if the job exists for spplying
    const job=await Job.findById(jobId);
    if(!job){
        return res.status(400).json({
            message:"Job not found",
            success:false
        })
    }

    //create a new application
    const newApplication=await Application.create({
        job:jobId,
        applicant:userId,
    })

    job.application.push(newApplication._id);


    await job.save();
    return res.status(200).json({
        message:"Application submitted successfully",
        success:true
    })

   } catch (error) {
        console.log(error);
        
   }

}

//how many jobs user has applied for

export const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;//id from isAuthenticated(middleware)
        const application=await Application.find({applicant:userId})
        .sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        })

        if(!application){
            return res.status(404).json({
                message:"No application found",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


//recruiter ll check how many students have applied for the job
export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job =await Job.findById({_id:jobId}).
        populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })

        if(!job){
            return res.status(404).json({
                message:"No job found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

         
    } catch (error) {
        console.log(error)
    }

}


//student rejected hua ya selected hua


//konse application ka status kya h aur use update karna h 

export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        
        if(!status){
            return res.status(400).json({
                message:"Please select a status",
                success:false
            })
        }

        const application=await Application.findById({_id:applicationId});

        if(!application){
            return res.status(404).json({
                message:"Application Not Found",
                success:false
            })
        }

        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
