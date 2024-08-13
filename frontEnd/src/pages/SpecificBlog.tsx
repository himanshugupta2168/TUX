import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import Loader from "../components/ui/Loader";
function SpecificBlog() {
  let {id} = useParams();
  const {loading, blog}= useBlog({
    id:id ||"",
  });
  console.log(blog);
  if (loading)return(<>
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <Loader/>
    </div>
  </>)
  else
  return (

    <div>
      <Navbar text={"Create"} url ={"/new"}/>
      <FullBlog id={blog?._id||""} title={blog?.title||""} content={blog?.content||""} publishedDate={blog?.publishedDate||""} author={blog?.author.name||""}/>
    </div>
  )
}

export default SpecificBlog