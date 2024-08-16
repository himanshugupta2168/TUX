import axios from "axios";
import {  useEffect, useState } from "react"
import { toast } from "react-toastify";
interface Blog{
    _id:string,
    title:string,
    content:string,
    publishedDate:string,
    author:{
      name:string,
    }
  
  }


  type UserProfileDetailsType = {
    success:boolean,
    user: {
        location: string;
        bio: string;
        posts: { }[];
        favouritedPosts: { }[];
        id:string, 
        name:string
        createdAt:any,
        updatedAt:any
    }
};


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
        .catch(()=>{toast.error("error in fetching blogs")}).finally(()=>{setLoading(false)})
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
        .catch(()=>{toast.error("error in fetching blogs")}).finally(()=>{setLoading(false)})
    }, [id])
    return {
        loading, blog
    }
}



export const FetchUserDetails=(id:string)=>{
    const[loading, setLoading]= useState(true);
    const [userProfileDetails, setUserProfileDetails]= useState<UserProfileDetailsType>();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}auth/${id}`)
        .then((response)=>{
            setLoading(false);
            setUserProfileDetails(response.data)
        })
        .catch(()=>{toast.error("UNABLE to fetch user details")}).finally(()=>{setLoading(false)});
    },[id])
    return {loading, userProfileDetails}
}