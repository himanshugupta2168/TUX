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
  const [Loading, setLoading]= useState(false);
  const  setValue= useSetRecoilState(userDetails)
  async function authenticate(){
    try{
      setLoading(true);
      const url= `${import.meta.env.VITE_URL}auth/${type}`
      // console.log(url);
      let response = await axios.post(url, postInputs);
      const data = response.data;

      if (data && data.success==true){
        localStorage.setItem("authorization", data.token);
        setValue({
          id:data.id,
          name:data.name
        });
        toast.success(`${type} successful`,{
          position:"top-center"
        })
        setLoading(false);
        navigate(`/blogs`)
      }else{
        throw new Error("unable to login ");
      }
    }
    catch(e:any){
      // console.log(e.response.data.message);
      toast.error(e.response.data.message)
      setLoading(false);
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
          <button onClick={authenticate} className=" bg-gradient-to-r from-violet-900 to-neutral-950 w-1/2 text-white mt-4 h-12 rounded-md text-lg hover:bg-gradient-to-r hover:from-neutral-900 hover:to-violet-900">{Loading ? "...." : type === 'signin' ? "Login" : "Signup"}</button>
        </div>
        <div className="hidden lg:block bg-gradient-to-br from-purple-950 to-neutral-950 rounded-md text-white">
          <div className="w-4/5 flex flex-col justify-center mx-auto h-full">
            <h1 className="text-[28px] font-bold">
              {type==="signup"?"Ready to Share Your Story?":"We missed you. Ready to Continue Your Story?"}
            </h1>
            <p className="mt-4 text-gray-400">{type==="signup"?"Become a part of our vibrant community of writers and readers. Start posting your story today!.":"Keep writing, sharing, and connecting with our community. Your story awaits."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
