
interface fullBlog{
    id:string, 
    title:string, 
    content:string,
    publishedDate:string,
    author:string,
}

function FullBlog({id, title, content,publishedDate, author}:fullBlog) {
    console.log(id , title, content, publishedDate, author);
  return (
    <div className="w-[90%] lg:w-[80%] grid grid-rows-2 md:grid-cols-12 mx-auto mt-8 ">
        <div className="md:col-span-8" >
            <h3 className="sm:text-3xl text-5xl font-extrabold mb-4 ">{title}</h3>
            <h4 className="sm:w-full">Posted on {publishedDate.split("T")[0]}</h4>
            <p className="mb-4">{content}</p>
        </div>
        <div className="  col-span-4  p-4 ">
            <h2>Author</h2>
            <div className="flex w-full items-center gap-4 my-4">
                <div className="w-[40px] h-[40px] bg-slate-600 rounded-full text-white text-center text-2xl">{author.substring(0,1)}</div>
                <div className="w-3/4">
                    <p className="text-xl font-bold">{author}</p>
                    <p className="text-slate-400 font-semibold">Master of mirth, purveyor of puns, and the funniest person in the kingdom </p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default FullBlog