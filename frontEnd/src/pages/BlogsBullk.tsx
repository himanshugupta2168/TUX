import BlogCard from "../components/BlogCard"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Loader from "../components/ui/Loader";
import { useBlogs } from "../hooks"
function BlogsBullk() {
  const {loading,blogs}= useBlogs();
  console.log(blogs); 
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