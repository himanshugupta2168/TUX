import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
function SpecificBlog() {
  let {id} = useParams();
  const {loading, blog}= useBlog({
    id:id ||"",
  });
  if (loading)return(<>
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-20 w-20 bg-slate-400 animate-ping"></div>
    </div>
  </>)
  else
  return (

    <div>
      <Navbar text={"Create"} url ={"/new"}/>
      <FullBlog id={blog?._id||""} title={blog?.title||""} content={blog?.content||""} publishedDate={blog?.publishedDate||""} author={blog?.authorId.name||""}/>
    </div>
  )
}

export default SpecificBlog