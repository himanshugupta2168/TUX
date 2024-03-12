import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate}from "react-router-dom";
import BlogsBullk from "./pages/BlogsBullk";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SpecificBlog from "./pages/SpecificBlog";
import {useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";
import {authState} from "./store/atoms/auth"
import { useEffect } from "react";
import CreateBlog from "./pages/CreateBlog";
function App() {

  return (

    <div>
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
  const navigate = useNavigate();
  useEffect(()=>{
    if (presentAuthState()){
      navigate("/blogs")
    }
    else{
      navigate("/signin")
    }
  },[])
  return(
    <div>

    </div>
  )
}
