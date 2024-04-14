import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRupeeSign } from "react-icons/fa";

function Home() {
  const [data1, setData1] = useState([]);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4444/user/send/user");
        setData1(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authorization");
        const response = await axios.get("http://localhost:4444/user/data", {
          headers: { authorization: token },
        });
        setUserData(response.data);
      } catch (error) {
        navigate("/login");
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = data1.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="bg-gray-300 h-screen">
        <div className="flex justify-between bg-sky-500  ">
          <div>
            <p className="text-white font-semibold text-4xl p-4">Paytm</p>
          </div>
          
          <div className="p-4 flex">
            <span className="pt-4 text-3xl text-white font-semibold">
              Hello,
            </span>
            <p className="border-white border-4 rounded-3xl p-4 text-white font-semibold text-xl ml-3">
              {userData.firstname}
            </p>
          </div>
        </div>
        <div className="p-3 text-3xl flex">
          <div className="">
         <p className="font-semibold"> Your balance: </p>
          </div>
          <div className="pt-1">
           <FaRupeeSign />
          </div>
          <div className="pb-2 font-semibold">
            <p>5367</p>
          </div>
       
        
         </div>
         <div className="flex">
         <div className="p-3 font-semibold text-3xl">Users:</div>
         <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-400 w- text-xl rounded-md p-2 m-2 outline-none focus:border-2 focus:border-sky-600"
        />
        </div>
        <br />
        {filteredUsers.map((data) => (
          <div key={data._id}>
            <div className="max-h-screen flex justify-center p-4">
              <div className="bg-sky-500 h-32 w-2/5 flex justify-between rounded-2xl">
                <div>
                  <img
                    className="h-full"
                    src="https://media.licdn.com/dms/image/D4E12AQGm68ZlS2Vprg/article-cover_image-shrink_600_2000/0/1659944235232?e=2147483647&v=beta&t=ZCrJHfLN304-aIu4CooLJTVhRMAR4RZPpcMMqmAkmew"
                    alt=""
                  />
                </div>
                <div className="flex justify-between">
                  <div className="pt-4 p-2">
                    <p className="pb-4 ml-1 font-semibold text-white text-2xl">
                      {data.firstname}
                    </p>
                    <button className="font-semibold bg-black p-2 rounded-2xl text-white text-2xl" onClick={() => navigate("/sendmoney")}>
                      Send Money
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
