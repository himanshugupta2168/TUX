import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
interface Blog{
    _id:string,
    title:string,
    content:string,
    publishedDate:string,
    authorId:{
      name:string,
    }
  
  }

export const useBlogs = ()=>{
    const [loading, setLoading]= useState(true);
    const [blogs, setBlogs]= useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}blog/bulk`, {
            headers:{
                Authorization:localStorage.getItem('authorization')
            }
        })
        .then((response)=>{
            setBlogs(response.data.data)
            setLoading(false);
        })
        .catch(()=>{toast.error("error in fetching blogs")})
    }, [])
    return {
        loading, blogs 
    }
}

export const useBlog=({id}:{ id : string })=>{
    const [loading, setLoading]= useState(true);
    const [blog, setBlog]= useState<Blog>();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}blog/${id}`, {
            headers:{
                Authorization:localStorage.getItem('authorization')
            }
        })
        .then((response)=>{
            setBlog(response.data.data)
            setLoading(false);
        })
        .catch(()=>{toast.error("error in fetching blogs")})
    }, [id])
    return {
        loading, blog
    }
}