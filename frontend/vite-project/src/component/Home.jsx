import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSend, FiSearch, FiUser, FiDollarSign, FiHome } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [usersRes, userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}user`),
          axios.get(`${API_BASE_URL}user/${userId}`)
        ]);
        setUsers(usersRes.data);
        setCurrentUser(userRes.data);
      } catch (error) {
        toast.error("Failed to load data. Please try again.");
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [userId]);

  const handleTransaction = (id) => {
    navigate(`/sendmoney/${id}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user._id !== userId &&
      (user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-medium text-gray-700">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <RiWallet3Line className="text-white text-3xl" />
              <h1 className="text-white text-2xl font-bold">PayWave</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-blue-700/30 px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiUser className="text-white" />
                </div>
                <span className="text-white font-medium">
                  {currentUser.firstname || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Balance Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-500 text-sm font-medium">AVAILABLE BALANCE</h2>
              <div className="flex items-center mt-2">
                <FiDollarSign className="text-gray-700 text-xl mr-1" />
                <span className="text-3xl font-bold text-gray-800">{currentUser.balance || '0.00'}</span>
              </div>
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
              onClick={() => navigate('/')}
            >
              <FiHome className="mr-2" />
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Search and User List */}
      <div className="container mx-auto px-4 mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Transfer Money</h2>
          
          {/* Search Bar */}
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Users Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredUsers.map((user) => (
              <div key={user._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-xl font-semibold">
                        {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {user.firstname} {user.lastname}
                      </h3>
                      <p className="text-gray-500 text-sm">@{user.firstname?.toLowerCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTransaction(user._id)}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all"
                  >
                    <FiSend className="mr-2" />
                    Send Money
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
            <div className="text-gray-400 mb-4">
              <FiSearch className="inline-block text-4xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-500">
              {search ? "Try a different search term" : "No users available to display"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;