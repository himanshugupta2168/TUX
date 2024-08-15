import { Link, useNavigate } from "react-router-dom"
import { userDetails } from "../store/atoms/userDetails"
import { useRecoilValue } from "recoil"
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
interface navBar{
  text?:string, 
  url?:string,
}
function Navbar({url}:navBar) {
    const user = useRecoilValue(userDetails);
    const [logoutVisible, setLogoutVisible]= useState(false)
    const navigate= useNavigate();
    function handleChange(){
      navigate(`${url}`)
    }
    console.log(user);



  return (
      <div className="fixed top-0 right-0 left-0 z-20 backdrop-blur-sm flex justify-between w-[90%] mx-auto h-14 items-center px-4">
          <div className="font-bold text-3xl text-purple-800 "><Link to={"/"}> Dastaan</Link></div>
          <div className="flex items-baseline gap-8">
              {url && <button className="border border-gray-600 text-white px-4 py-2 hover:text-gray-400 rounded-md  duration-200" onClick={handleChange}><div className="flex gap-4 items-center">
                <p>Write</p>
               <HiOutlinePencilSquare />
                </div></button>}
              <div className="">
                {localStorage.getItem('authorization')&&<p className="w-[30px] h-[30px] bg-slate-600 rounded-full text-white text-center text-[20px] cursor-pointer" onClick={()=>{setLogoutVisible(!logoutVisible)}}>{user.split("")[0]  || 'A'}</p>}
                {logoutVisible && localStorage.getItem('authorization')&&<h3 className="absolute mt-4 border border-slate-500 py-2 px-4 right-6 top-8 rounded-md cursor-pointer text-white" onClick={()=>{
                  localStorage.removeItem('authorization');
                  navigate("/");
                }}>Logout</h3>}
              </div>
          </div>
      </div>

  )
}

export default Navbar