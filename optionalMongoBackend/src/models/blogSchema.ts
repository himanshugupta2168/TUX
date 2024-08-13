import mongoose from "mongoose";
import { createBlogInputType } from "cohort-medium-common";

const BlogSchema = new mongoose.Schema<createBlogInputType>({
    title:{
        type:String, 
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    published:{
        type:Boolean,
        required:true,
        default:true,
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
})

export default mongoose.model("Blog", BlogSchema);
