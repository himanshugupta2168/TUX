import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { signUpInputType } from 'cohort-medium-common'
import { toast,} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDetails } from "../store/atoms/userDetails";
import { useSetRecoilState } from "recoil";

function AuthComponent({ type }: {type:"signup"|"signin"}) {
  // const[login, setLogin]= useState(false);
  const navigate = useNavigate();
  const [postInputs, setPostInupts]= useState<signUpInputType>({
    name:"",
    email:"",
    password:""
  })
  const  setValue= useSetRecoilState(userDetails)
  async function authenticate(){
    try{
      const url= `${import.meta.env.VITE_URL}auth/${type}`
      // console.log(url);
      let response = await axios.post(url, postInputs);
      const data = response.data;

      if (data && data.success==true){
        localStorage.setItem("authorization", data.token);
        setValue(data.name);
        toast.success(`${type} successful`,{
          position:"top-center"
        })
        navigate(`/blogs`)
      }else{
        throw new Error("unable to login ");
      }
    }
    catch(e){
      toast.error("Invalid Credentials", {
        position:"top-center"
      })
      navigate(`/${type}`)
    }
  }
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        <div className="w-full h-full  flex flex-col justify-center items-center ">
          <div className="w-4/5 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {type === "signup" ? `Create an Account` : `Login `}
            </h3>
            <p className="text-slate-500">
              {type === "signup" ? (
                <>
                  Already have an account?
                  <Link to={"/signin"} className="underline pl-2">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?
                  <Link to={"/signup"} className="underline pl-2">
                    SignUp Now
                  </Link>
                </>
              )}
            </p>
          </div>
                {/* the form inputs here  */}
          <div className="w-1/2 mt-8">
                {
                type==="signup"&&
                <div className="flex flex-col pb-4">
                    <label htmlFor="name" className="font-bold">FullName</label>
                    <input type="text" id="name" placeholder="John Doe" className="mt-2 px-2 border border-slate-400 rounded-md h-10" onChange={(e)=>{setPostInupts({
                      ...postInputs,
                      name:e.target.value
                    })}}/>
                </div>
                }
                <div className="flex flex-col pb-2">
                    <label htmlFor="email" className="font-bold">Email Address</label>
                    <input type="email" id="email" placeholder="johndoe@example.com" className="mt-2 px-2 border border-slate-400 rounded-md h-10"
                    onChange={(e)=>{
                      setPostInupts({
                        ...postInputs,
                        email:e.target.value,
                      })
                    }}
                    />
                </div>
                <div className="flex flex-col pb-2">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <input type="password" id="password" placeholder="*************" className="mt-2 px-2 border border-slate-400 rounded-md h-10"
                    onChange={(e)=>{
                      setPostInupts({
                        ...postInputs, 
                        password:e.target.value,
                      })
                    }}/>
                </div>
          </div>
          <button onClick={authenticate} className=" bg-black w-1/2 text-white mt-4 h-12 rounded-md text-lg hover:opacity-85">{type==="signin"?"Login":"Signup"}</button>
        </div>
        <div className="hidden lg:block bg-[#f3f4f6]">
          <div className="w-4/5 flex flex-col justify-center mx-auto h-full">
            <h1 className="text-[30px] font-bold">
              " The customer service i recieved was exceptional. The support
              team went above and beyond to address my concerns."
            </h1>
            <p className="mt-4 text-xl font-semibold">Jules Winnfeild</p>
            <p className="text-slate-400 font-semibold">CEO, Acme Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
