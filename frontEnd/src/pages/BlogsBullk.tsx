import { useRecoilState, useRecoilValue} from "recoil";
import BlogCard from "../components/BlogCard"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Loader from "../components/ui/Loader";
import { useBlogs } from "../hooks"
import { authState } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { userDetails } from "../store/atoms/userDetails";
function BlogsBullk() {
  const fetchUser = async()=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}auth`,{},{
        headers:{
          Authorization:localStorage.getItem('authorization')
        }
      })
      console.log(response.data.user);
      setuer(response.data.user);
    }
    catch(e){
      localStorage.setItem("authorization", "");
      navigate("/");
      console.error(e);
    }
  }
  const [user, setuer]= useRecoilState(userDetails)
  const {loading,blogs}= useBlogs(); 
  const navigate = useNavigate()
  const auth:any= useRecoilValue(authState)
  // console.log(auth);
  useEffect(()=>{
    if (user.name=="Anonymous"){
      fetchUser();
      navigate("/blogs")
    }
    if (!auth()){
      navigate("/")
    }
  }, [])
  if (loading)return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-950">
      <Loader/>
    </div>)
  else{
    return (
      <div className="bg-neutral-950 ">
        <Navbar text={"+"} url={"/new"}/>

        <div className="w-full pt-16 pb-10 min-h-screen">
          {
            blogs.length>0?(
              // @ts-ignore
              blogs.map((blog, index)=>(<BlogCard key={index} title={blog.title} content={blog.content} publishedDate={blog.publishedDate}  authorName={blog.author.name} id={blog.id}/>))
            ):(
              <div className="text-4xl">
                  It’s quiet here… too quiet. Break the silence with your first blog post!
              </div>
            )
          }

        </div>
        <Footer/>
      </div>
    )
  }
}

export default BlogsBullk;