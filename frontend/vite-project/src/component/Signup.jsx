import React, { useState } from "react";
import Navber from "./Navber";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"
import Cookies from 'js-cookie'
function Signup() {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4444/user/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      Cookies.set("authorization", response.data.token);
      setfirstname("");
      setlastname("");
      setEmail("");
      setpassword("");
      setTimeout(()=>{
        navigate("/home")
      },6000)
      toast.success(response.data.message, { position: "top-right" });
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="flex justify-between">
    <div  className="flex justify-center items-center max-h-screen">
      <Navber />
      <img id="color" src="https://pbs.twimg.com/media/FsSfc1WXwAEditp?format=jpg&name=4096x4096" alt=""/>
     
      </div>
      <div className="min-h-screen flex justify-center items-center pb-10">
        <form
          onSubmit={handleSubmit}
          className="border-sky-500 border-2 rounded-2xl  py-10 px-6"
        >
          <p className="text-sky-500 mb-4 font-semibold text-2xl">
            Signup to create an account
          </p>
          <div className="m">
            <p className="mb-4 text-sky-500 font-semibold text-xl">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900 hover:text-sky-500">
                Login
              </Link>
            </p>
          </div>
          <div>
            <label
              className="text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Firstname
            </label>
            <input
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              className="shadow  outline-none focus:border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 "
              type="text"
              placeholder="First Name"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label
              className="text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Lastname
            </label>
            <input
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              className="shadow   outline-none focus:border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 "
              type="text"
              placeholder="Last Name"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label
              className="text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow   outline-none focus:border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 "
              type="email"
              placeholder="Email"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label
              className="text-sky-500 font-semibold text-xl"
              htmlFor="name"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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
              className="text-white bg-sky-500 m-2 text-xl font-semibold rounded-lg hover:bg-sky-700  p-3"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
