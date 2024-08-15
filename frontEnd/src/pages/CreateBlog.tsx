import { useState } from "react"
import Navbar from "../components/Navbar"
import { createBlogInputType } from "cohort-medium-common"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import EditorComponent from "../components/Editor"
import Footer from "../components/Footer"
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
          toast.error("Error while publishing blog",{
            position:"top-center"
          })
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
    // console.log(data);
  return (
    <div className="pt-12 min-h-screen bg-neutral-950">
         <Navbar/> 
        <div className="w-[90%] md:w-[80%] mx-auto mt-4 pb-20 ">
            <input type="text" name="title" id="" placeholder="TITLE ... " className="h-[80px] w-full text-5xl px-4 outline-none mb-4 font-bold bg-black text-white" onChange={(e)=>{setData({
              ...data,
              title:e.target.value,
            })}} value={data.title} required/>
            <EditorComponent data={data} setData={setData}/>
            <button className="bg-green-600 px-4 py-2 rounded-3xl   text-white hover:bg-green-700 duration-200" onClick={handlePublish}> Publish </button>
        </div>  
        <Footer/>
    </div>
  )
}

export default createBlog