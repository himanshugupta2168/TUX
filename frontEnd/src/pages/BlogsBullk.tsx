import BlogCard from "../components/BlogCard"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Loader from "../components/ui/Loader";
import { useBlogs } from "../hooks"
function BlogsBullk() {
  const {loading,blogs}= useBlogs();

  if (loading)return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-950">
      <Loader/>
    </div>)
  else{
    return (
      <div className="bg-neutral-950">
        <Navbar text={"+"} url={"/new"}/>

        <div className="w-full pt-16 pb-10">
          {
            blogs.length>0?(
              blogs.map((blog)=>(<BlogCard key={blog.id} title={blog.title} content={blog.content} publishedDate={blog.publishedDate}  authorName={blog.author.name} id={blog.id}/>))
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