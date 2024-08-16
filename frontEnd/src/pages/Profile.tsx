import { useEffect, useState, useRef, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import { authState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { FetchUserDetails } from "../hooks";
import Loader from "../components/ui/Loader";
import axios from "axios";
import { userDetails } from "../store/atoms/userDetails";
import { useRecoilState } from "recoil";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

// Define the type for UserProfileDetails
type UserProfileDetailsType = {
  user: {
    location: string;
    bio: string;
    posts: any[];
    favouritedPosts: any[];
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
  };
};

const Profile = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, userProfileDetails } = FetchUserDetails(id as string) as {
    loading: boolean;
    userProfileDetails: UserProfileDetailsType | null;
  };
  const [user, setUser] = useRecoilState(userDetails);
  const [updateBio, setUpdateBio] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}auth`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authorization") ?? "",
          },
        }
      );
      setUser(response.data.user);
    } catch (e) {
      localStorage.setItem("authorization", "");
      navigate("/");
      console.error(e);
    }
  };
  useEffect(() => {
    if (user.name === "Anonymous") {
      fetchUser();
    }
    if (!auth()) {
      navigate("/");
    }
  }, [user.name, auth, navigate]);

  const [profileData, setProfileData] = useState({
    location: "",
    bio: "",
  });

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (userProfileDetails && userProfileDetails.user) {
      setProfileData({
        bio: userProfileDetails.user.bio,
        location: userProfileDetails.user.location,
      });
    }
  }, [userProfileDetails]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [profileData.bio]);

  const handleProfileUpdate = () => {
    if (!updateBio) {
      setUpdateBio(!updateBio);
    } else {
      axios
        .patch(`${import.meta.env.VITE_URL}auth/${user.id}`, profileData)
        .catch((e) => {
          toast.error(e.message);
        });
      setUpdateBio(!updateBio);
    }
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      bio: e.target.value,
    });
    adjustTextareaHeight();
  };

  if (loading || !userProfileDetails || !userProfileDetails.user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950">
      <Navbar />
      <div className="pt-16 mx-auto w-[90%] min-h-screen flex flex-col lg:flex-row gap-4 py-10 text-white">
        <div className="border border-gray-500 pb-10 w-full rounded-xl lg:w-5/12">
          <div className="mt-10 mx-4">
            <div className="flex items-center p-4 pb-10 gap-4 border-b border-gray-700">
              <div className="bg-blue-400 w-16 h-16 flex items-center justify-center text-4xl rounded-2xl ">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <h2>{user.name}</h2>
                <p className="text-[14px] break-words text-slate-400">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
          <div className="py-4 px-8 text-[15px] w-full">
            <input
              type="text"
              name=""
              id=""
              value={profileData.location}
              className={`bg-transparent outline-none block pb-4 w-full text-slate-400 ${
                updateBio && "border-b border-slate-700 "
              }`}
              disabled={!updateBio}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  location: e.target.value,
                });
              }}
            />
            <textarea
              ref={textareaRef}
              name=""
              id=""
              value={profileData.bio}
              className={`bg-transparent outline-none block py-2 w-full text-slate-400 ${
                updateBio && "border-b border-slate-700"
              } resize-none`}
              disabled={!updateBio}
              onChange={handleBioChange}
            />
            <button
              className="border border-gray-700 text-slate-400 w-full h-10 rounded-3xl mt-4 hover:text-white"
              onClick={handleProfileUpdate}
            >
              {!updateBio ? "Edit Profile" : "Save Details"}
            </button>
          </div>
          {/* overview div  */}
          <div className="px-8 py-4 flex items-center justify-between w-full gap-2">
            <div className="flex-1 h-[1px] bg-slate-700" />
            <p className="font-semibold">OVERVIEW</p>
            <div className="flex-1 h-[1px] bg-slate-700" />
          </div>

          {/* stats div  */}
          <div className="px-8 w-full flex flex-col gap-2 md:flex-row justify-around items-center h-32 mb-10">
            {/* posts */}
            <div className="w-28 h-28 border border-slate-700 rounded-2xl flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-slate-400">
                {userProfileDetails.user.posts.length || 0}
              </h1>
              <p className="text-slate-400">Posts</p>
            </div>
            {/* liked */}
            <div className="w-28 h-28 border border-slate-700 rounded-2xl flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-slate-400">
                {userProfileDetails.user.favouritedPosts.length || 0}
              </h1>
              <p className="text-slate-400">Liked Posts</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 py-2">
            Member Since {userProfileDetails.user.createdAt.split("T")[0]}{" "}
          </p>
          <p className="text-center text-xs text-slate-400 py-2">
            Last Updated On {userProfileDetails.user.updatedAt.split("T")[0]}{" "}
          </p>
        </div>
        <div className=" w-full  lg:w-3/4 flex flex-col gap-4">
          <div className="w-full h-1/2 border border-gray-500 rounded-xl px-8 py-4">
            <h2 className="text-slate-400 pb-4 text-lg">Your Recent Posts</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {userProfileDetails.user.posts.length> 0 ?userProfileDetails.user.posts.map((post, index) => (
                <div
                  className="min-w-32 border border-gray-800 rounded-xl px-4 py-4 "
                  key={index}
                >
                  <img
                    src={post.thumbnail || "/EditorDemo.png"}
                    alt=""
                    className="w-full h-1/2 bg-contain"
                  />
                  <p>{post.title}</p>
                </div>
              )):<p className="w-full  flex items-center justify-center text-xl text-slate-400">No articles authored.</p>}
            </div>
          </div>
          <div className="w-full h-1/2 border border-gray-500 rounded-xl px-8 py-4">
            <h2 className="text-slate-400 pb-4 text-lg">Your Recent Liked Posts</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {userProfileDetails.user.favouritedPosts.length>0 ? userProfileDetails.user.favouritedPosts.map((post, index) => (
                <div
                  className="min-w-32 border border-gray-800 rounded-xl px-4 py-4 "
                  key={index}
                >
                  <img
                    src={post.thumbnail || "/EditorDemo.png"}
                    alt=""
                    className="w-full h-1/2 bg-contain"
                  />
                  <p>{post.title}</p>
                </div>
              )):<p className="w-full  flex items-center justify-center text-xl text-slate-400">No Liked posts</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
