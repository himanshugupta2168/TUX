import mongoose from "mongoose";
import {signUpInputType } from "cohort-medium-common";
const userSchema = new mongoose.Schema<signUpInputType>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    }
})

export default mongoose.model("User", userSchema);