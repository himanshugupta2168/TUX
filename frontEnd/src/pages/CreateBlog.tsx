import { useState } from "react"
import Navbar from "../components/Navbar"
import { createBlogInputType } from "cohort-medium-common"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
function createBlog() {
  const navigate = useNavigate();
    async function  handlePublish() {
      try{
        const resp = await axios.post(`${import.meta.env.VITE_URL}blog/publish`, data,{

          headers:{
            Authorization:localStorage.getItem('authorization')
          },
        });
        console.log(resp.data);
        if (resp.data.success){
          toast.success("Blog Published Successfully",{
            position:"top-center"
          })
          navigate("/");
        }
        
        else{
          toast.error("Error while publishing blog")
        }
      }
      catch(e:any){
        toast.error(e.message);
      }
    }   
    const[data , setData]= useState<createBlogInputType>({
      title:"",
      content:"",
      published:true,
    })
  return (
    <div>
        <Navbar/> 
        <div className="w-[90%] md:w-[80%] mx-auto mt-4">
            <input type="text" name="title" id="" placeholder="TITLE ... " className="h-[80px] w-full text-5xl px-4 outline-none mb-4 font-bold" onChange={(e)=>{setData({
              ...data,
              title:e.target.value,
            })}} value={data.title} required/>
            <textarea name="content" id=""  cols={10} rows={10} placeholder="Tell Your Story......" className="resize-none w-full px-4 text-lg outline-none" onChange={(e)=>{setData({
              ...data,
              content:e.target.value
            })}} value={data.content} required></textarea>
            <button className="bg-green-600 px-4 py-2 rounded-3xl absolute md:right-40 md:top-2 right-20 top-2 text-white hover:bg-green-700 duration-200" onClick={handlePublish}> Publish </button>
        </div>
    </div>
  )
}

export default createBlog