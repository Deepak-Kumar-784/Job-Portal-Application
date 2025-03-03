import mongoose from "mongoose";


//name of schema
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    //for which role you need to enter
    role:{
        type:String,
        required:true,
        enum:['student','recruiter']
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},//This creates a relationship between the profile and a Company document. It allows you to associate the user profile with a specific company by its unique MongoDB ObjectId.
        profilePhoto:{
            type:String,
            default:""
        }
    },
    
},{timestamps:true});

//model name
const User=mongoose.model("User",userSchema);

export default User;
