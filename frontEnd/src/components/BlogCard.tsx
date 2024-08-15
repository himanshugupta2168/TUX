import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiThumbsUp } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io";

interface BlogCardDetails {
  authorName: string;
  title: string;
  content: string;
  publishedDate?: string;
  id: string;
}
function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardDetails) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blogs/${id}`);
  };
  const monthMap = useMemo(() => {
    const months = new Map([
      [1, "January"],
      [2, "February"],
      [3, "March"],
      [4, "April"],
      [5, "May"],
      [6, "June"],
      [7, "July"],
      [8, "August"],
      [9, "September"],
      [10, "October"],
      [11, "November"],
      [12, "December"],
    ]);
    return months;
  }, []);
  const dateString = publishedDate?.split("T")[0];
  const date = dateString ? new Date(dateString) : null;
  const month =
    date && monthMap.get((date?.getMonth() + 1) % 12)?.substring(0, 3);
  const year = date?.getFullYear();
  const pDate = date?.getDate();
  return (
    <div className="mx-auto w-[90%] md:w-[70%]  py-4 px-4 my-4 rounded-md text-white border border-gray-700 ">
      <div className="flex gap-4 items-center">
        <div className="w-[40px] h-[40px] bg-slate-600 text-white rounded-full text-center text-[24px]">
          {authorName.substring(0, 1) || "Anonymous"}
        </div>
        <div>
          <p className="lg:text-[18px] font-semibold">{authorName}</p>
          <p className="text-sm text-gray-500">
            {month} {pDate}, {year}
          </p>
        </div>
      </div>

      {/* content */}
      <div className="mt-4 px-4  group cursor-pointer" onClick={handleClick}>
        <div className="flex flex-col-reverse md:flex-row w-full">
          <div className="w-full md:w-3/4 h-full">
            <h3 className="text-[20px] font-semibold font-serif md:text-[22px] lg:text-[20px]">
              {title}
            </h3>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2">
            <img src="/EditorDemo.png" alt=""  />
          </div>
        </div>
      </div>

      

      {/* likes and shares  */}
      <div className=" flex gap-8 px-4 py-4 items-center">
        <div className="flex items-center gap-2">
          <FiThumbsUp />
          <p>0 likes</p>
        </div>
        <div className="flex items-center gap-2">
          <IoMdPaper />
          <p>{Math.floor(Object.keys(content).length) + 1} minute(s) read</p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
