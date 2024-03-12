import { useNavigate } from "react-router-dom"
interface BlogCardDetails{
    authorName:string,
    title:string, 
    content:string,
    publishedDate?:string,
    id:string
}
function BlogCard({authorName , title , content , publishedDate , id}:BlogCardDetails) {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate(`/blogs/${id}`)
  }
  return (
    <div className="mx-auto w-[90%] md:w-[70%] border-b-2 py-4 px-4">
        <div className="flex  items-baseline gap-2">
            <div className="w-[40px] h-[40px] bg-slate-600 text-white rounded-full text-center text-[24px]">{authorName.substring(0,1)|| "Anonymous"}</div>
            <p className="lg:text-[18px] font-semibold">{authorName}</p>.<p className="text-xs">{publishedDate?.split('T')[0]}</p>
        </div>
        <div className="mt-4 group cursor-pointer" onClick={handleClick}>
            <h3 className="text-[15px] font-semibold font-serif md:text-[17px] lg:text-[20px]">{title}</h3>
            {content.length>200
            ?(<div>{content.substring(0,140)} <span className="text-blue-500 group-hover:text-blue-700 cursor-pointer">   ...read more </span></div>)
            :(<div>{content}</div>)}
        </div>
        <p className="pt-2 italic text-slate-500 text-sm">{Math.ceil(content.length/150)} minute(s) read </p>
    </div>
  )
}

export default BlogCard;