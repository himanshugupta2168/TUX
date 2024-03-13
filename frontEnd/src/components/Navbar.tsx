import { Link, useNavigate } from "react-router-dom"
import { userDetails } from "../store/atoms/userDetails"
import { useRecoilValue } from "recoil"
import { useState } from "react";
interface navBar{
  text?:string, 
  url?:string,
}
function Navbar({text,url}:navBar) {
    const user = useRecoilValue(userDetails);
    const [logoutVisible, setLogoutVisible]= useState(false)
    const navigate= useNavigate();
    function handleChange(){
      navigate(`${url}`)
    }
    console.log(user);



  return (
      <div className="flex justify-between w-[90%] mx-auto h-14 items-center px-4">
          <div className="font-bold text-2xl"><Link to={"/"}> TUX </Link></div>
          <div className="flex items-baseline gap-4">
              {url && <button className="bg-green-600 text-white px-4 py-1 rounded-2xl hover:bg-green-700 duration-200" onClick={handleChange}>{text}</button>}
              <div className="">
                {localStorage.getItem('authorization')&&<p className="w-[30px] h-[30px] bg-slate-600 rounded-full text-white text-center text-[20px] cursor-pointer" onClick={()=>{setLogoutVisible(!logoutVisible)}}>{user.split("")[0]  || 'A'}</p>}
                {logoutVisible && localStorage.getItem('authorization')&&<h3 className="absolute mt-4 border border-slate-500 py-2 px-4 right-6 top-8 rounded-md cursor-pointer" onClick={()=>{
                  localStorage.removeItem('authorization');
                  navigate("/");
                }}>Logout</h3>}
              </div>
          </div>
      </div>

  )
}

export default Navbar