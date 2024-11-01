import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRupeeSign, FaSearch, FaUser } from "react-icons/fa";

const API_BASE_URL = "http://localhost:4444";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchUsers(), fetchUserData()]);
      } catch (error) {
        setError("Failed to load data. Please try again.");
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/send/user`);
      setUsers(response.data);
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("authorization");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/user/data`, {
        headers: { authorization: token }
      });
      setUserData(response.data);
    } catch (error) {
      navigate("/login");
      throw new Error("Failed to fetch user data");
    }
  };

  const handleTransaction = async (sentId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/send`, {
        loginUserId: userId,
        sentUserId: sentId
      });
       console.log(response.data)
      if (response.data) {
        navigate("/sendmoney");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Failed to initiate transaction. Please try again.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user._id !== userId &&
      (user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300">
    
      <header className="bg-sky-500 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-white font-semibold text-4xl">Paytm</h1>
          <div className="flex items-center gap-3">
            <span className="text-3xl text-white font-semibold">Hello,</span>
            <div className="border-2 border-white rounded-full px-4 py-2">
              <span className="text-white font-semibold text-xl">
                {userData.firstname || "User"}
              </span>
            </div>
          </div>
        </div>
      </header>

    
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-3xl font-semibold">
          <span>Your balance:</span>
          <FaRupeeSign className="mt-1" />
          <span>5367</span>
        </div>
      </div>

    
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold">Users:</h2>
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 text-xl rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

    
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-sky-500 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex items-center p-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <FaUser className="text-4xl text-sky-500" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {user.firstname} {user.lastname}
                  </h3>
                  <button
                    onClick={() => handleTransaction(user._id)}
                    className="bg-black text-white px-6 py-2 rounded-full font-semibold text-xl hover:bg-gray-800 transition-colors"
                  >
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-600 text-xl">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;