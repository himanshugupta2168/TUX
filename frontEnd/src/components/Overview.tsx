import { FiThumbsUp } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io";

const Overview = () => {
  return (
    <div className='bg-neutral-950 text-white w-full px-12 md:px-20 pb-20 flex flex-col gap-4 lg:gap-8 md:gap-24'>
        <div className='w-full flex flex-col md:flex-row h-full md:h-64 gap-6 justify-around items-center'>
            <div className='w-full md:w-8/12 border rounded-xl border-gray-800 flex  flex-col-reverse lg:flex-row gap-10 relative overflow-hidden p-4'>
                <div className=' w-full lg:w-3/4 px-2'>
                    <div className='flex items-center gap-4 pb-4'>
                        <div className='w-16 h-16 bg-rose-950 rounded-full flex justify-center items-center font-bold text-3xl'>H </div>
                        <div>
                            <h2>Himanshu Gupta</h2>
                            <p className='text-slate-700'>Feb 07, 2024</p>
                        </div>
                    </div>
                    <h1 className='font-semibold text-lg'>What i learnt from this project </h1>
                    <p className='text-sm py-2'>As I sit down to reflect on my journey through my first full-stack React project, "Dastaan" , I am filled with a sense of accomplishment and a wealth of newfound knowledge. This project has been more than just a coding exercise; it has been a journey of discovery, growth, and overcoming challenges. I...</p>
                    <div className=' flex gap-8 items-center'>
                        <div className='flex items-center gap-2'>
                            <FiThumbsUp />
                            <p>100 likes</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <IoMdPaper />
                            <p>2 minute(s) read</p>
                        </div>
                    </div>
                </div>
                <img src="https://en.idei.club/uploads/posts/2023-08/thumbs/1690933244_en-idei-club-p-coding-room-setup-dizain-instagram-16.jpg" alt=" promotionalImage" className='w-full lg:w-48 h-48' />
            </div>
            <div className='w-4/12 hidden lg:flex flex-col items-end'>
                <div className='w-full  px-2 border-b border-slate-600 py-2'>
                    <p className='text-end text-xl'>Find the Best Reads</p>
                </div>
                <p className='pt-2 text-sm'>Login to unlock a world of stories posted by others.</p>
            </div>
        </div>
        {/* snd  */}
        <div className='w-full flex-1 flex flex-col lg:flex-row-reverse h-full md:h-64 gap-6 justify-around items-center mt-20'>
            <div className=' border rounded-xl border-gray-800 relative overflow-hidden p-4'>
                <img src="/UserProfileDemo.png" alt=" promotionalImage" className='' width={500} height={500}/>
            </div>
            <div className=' w-full flex-1 flex flex-col items-center lg:items-start'>
                <div className='w-full  px-2 border-b border-slate-600 py-2'>
                    <p className=' text-center lg:text-start text-xl'>Like Your Favourites</p>
                </div>
                <p className='pt-2 text-sm'>Find them in your profile </p>
            </div>
        </div>
        {/* 3rd*/}
        <div className='w-full flex-1 flex flex-col lg:flex-row h-full md:h-64 gap-6 justify-around items-center lg:my-8'>
            <div className=' border rounded-xl border-gray-800 relative overflow-hidden p-4'>
                <img src="/EditorDemo.png" alt=" promotionalImage" className='' width={500} height={900}/>
            </div>
            <div className='hidden  w-full flex-1 lg:flex flex-col items-center lg:items-end'>
                <div className='w-full  px-2 border-b border-slate-600 py-2'>
                    <p className=' text-center lg:text-end text-xl'>Write your ideas and thoughts</p>
                </div>
                <p className='pt-2 text-sm'>Through a Rich Text Editor craft engaging content</p>
            </div>
        </div>
    </div>
  )
}

export default Overview