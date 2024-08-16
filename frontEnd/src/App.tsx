import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Link}from "react-router-dom";
import BlogsBullk from "./pages/BlogsBullk";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SpecificBlog from "./pages/SpecificBlog";
import {useRecoilState, useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";
import {authState} from "./store/atoms/auth"
import { useEffect } from "react";
import CreateBlog from "./pages/CreateBlog";
import { Landing } from "./components/Landing";
import Overview from "./components/Overview";
import Footer from "./components/Footer";
import { userDetails } from "./store/atoms/userDetails";
import axios from "axios";
function App() {

  return (

    <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppDislay/>}/>
            <Route path="/blogs" element={<BlogsBullk/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/blogs/:id" element={<SpecificBlog/>}/>
            <Route path="/new" element={<CreateBlog/>}/>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </div>
  );
}

export default App;

function AppDislay(){
  const presentAuthState = useRecoilValue(authState);
  const [user, setUser]= useRecoilState(userDetails)
  const navigate = useNavigate();
  const fetchUser = async()=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}auth`,{},{
        headers:{
          Authorization:localStorage.getItem('authorization')
        }
      })
      setUser(response.data.user.name)
    }
    catch(e){
      console.error(e);
    }
  }
  useEffect(()=>{
    if (presentAuthState()){
      fetchUser();
      navigate("/blogs")
    }
    else{
      navigate("/")
    }
  },[])
  return(
    <div className="w-full min-h-screen relative">
      <div className="fixed z-30 w-full bg-transparent backdrop-blur-sm  text-white  h-16 top-0 left-0 px-20 flex items-center justify-between">
          <Link to={"/"} className="text-3xl font-black text-violet-800 flex-1"> Dastaan</Link>
          <div className="md:flex gap-12 hidden">
            <Link to={"/"}><button className="px-8 py-2 h-full hover:text-slate-500 duration-200">Home</button></Link>
            <Link to={"/signin"}><button className="px-8 py-2 h-full hover:text-slate-500 duration-200">Login</button></Link>
            <Link to={"/signup"}><button className="px-8 py-2 h-full text-white bg-violet-800 rounded-lg hover:bg-white hover:text-black duration-200">SignUp</button></Link>
          </div>
      </div>
      <div>
        <Landing/>
        <Overview/>
        <Footer/>
      </div>
    </div>
  )
}
