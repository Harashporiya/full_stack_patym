import React, { useState } from "react";
import axios from "axios";
import Navber from "./Navber";
import { Link , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import Cookies from 'js-cookie';
function Login() {
    const navigate = useNavigate();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const handleSubmit =async(e)=>{
      e.preventDefault();
      try{
        const response = await axios.post("http://localhost:4444/user/login",{
           email,
           password,
      })
      Cookies.set("authorization", response.data.token);
      setemail("");
      setpassword("");
      setTimeout(()=>{
        navigate("/home")
      },6000)
      toast.success(response.data.message, { position: "top-right" });
      console.log(response.data);
      }catch(error){
       console.log("Error", error);
      }
      
    }
  return (
    <div className="flex justify-between">
    <div  className="flex justify-center items-center max-h-screen">
      <Navber />
      <img id="color" src="https://pbs.twimg.com/media/FsSfc1WXwAEditp?format=jpg&name=4096x4096" alt=""/>
     
      </div>
      <div className="min-h-screen flex justify-center items-center pb-20">
     
        <form onSubmit={handleSubmit} className=" border-sky-500 border-2 rounded-2xl  py-10 px-6">
        <p className="mb-6 text-sky-500 font-semibold text-2xl">
            Login to your account
          </p>
          <div>
            <p className="mb-4  text-sky-500 font-semibold text-xl">
              Don't have an account yet? <Link to="/signup" className=" text-blue-700 hover:text-sky-500">Signup
              </Link>
            </p>
          </div>
          <div>
            <label
              className=" text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Email
            </label>
            <input onChange={(e)=>setemail(e.target.value)} value={email}
              className="shadow   outline-none focus:border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 "
              type="email"
              placeholder="Email"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label
              className=" text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Password
            </label>
            <input onChange={(e)=>setpassword(e.target.value)} value={password}
              className="shadow  outline-none focus:border-2 focus:border-sky-600  rounded w-full py-2 px-3 text-gray-700 "
              type="text"
              placeholder="Password"
              id="name"
              name="name"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="text-white  bg-sky-500 m-2 text-xl font-semibold rounded-lg hover:bg-sky-600  p-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
