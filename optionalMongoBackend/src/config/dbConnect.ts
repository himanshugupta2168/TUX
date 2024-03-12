import mongoose from "mongoose";
require("dotenv").config()

const mongourl :string = (process.env.DB_URL)as string;


export const dbConnect =async()=>{
    try{
       await  mongoose.connect(mongourl)
       console.log("connected to db");
    }
    catch(e:any){
        console.log("error in connecting to the  database ", e.message);
    }
}