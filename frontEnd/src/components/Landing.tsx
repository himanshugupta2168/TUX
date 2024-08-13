import { BackgroundBeams } from "./ui/background-beams";
import { useNavigate } from "react-router-dom";


export function Landing() {
  const navigate = useNavigate()
  return (
    <div className=" w-full h-screen  bg-neutral-950 relative  antialiased">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className=" mx-auto p-4 flex justify-center flex-col items-center gap-4 ">
          <h1 className="relative z-10 text-3xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Welcome to <span className="text-purple-600">Dastaan!!</span>
          </h1>
          <p className="text-neutral-500  mx-auto my-2  text-center relative z-10 text-2xl">
            Find your next great read , share your story with the world. Write,
            connect and be heard.
          </p>
          <button className="bg-gradient-to-r from-violet-800 to-slate-900 text-white px-6 py-3 text-xl z-20  rounded-xl cursor-pointer hover:bg-gradient-to-l hover:from-violet-800 hover:to-slate-900 " onClick={()=>{
            navigate("/signup")
          }}>
            Get Started
          </button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
