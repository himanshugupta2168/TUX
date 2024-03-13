import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import { useBlogs } from "../hooks"
function BlogsBullk() {
  const {loading,blogs}= useBlogs();
  // console.log(blogs);
  if (loading)return (<div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-slate-400 animate-ping"></div>
      </div>
    </div>)
  else{
    return (
      <>
        <Navbar text={"Create"} url={"/new"}/>
        {
          //@ts-ignore
          blogs.map((blog)=>(<BlogCard key={blog._id} title={blog.title} content={blog.content} publishedDate={blog.publishedDate}  authorName={blog.authorId.name} id={blog._id}/>))
        }
      </>
    )
  }
}

export default BlogsBullk;