import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;


const SendMoney = () => {
  const [amount, setAmount] = useState('');
  const [nameUser, setNameUser] = useState({ firstname: '', lastname: '' });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount", { position: "top-right" });
      return;
    }

    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}transaction/send/${params.id}`,
        {
          sender: userId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAmount("");
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Error", error);
      toast.error(error.response?.data?.message || "Transaction failed", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}user/${params.id}`);
        setNameUser(res.data);
      } catch (error) {
        console.log("Error", error);
        toast.error("Failed to load recipient data", { position: "top-right" });
      }
    };
    fetchUserData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Send Money</h1>
            <p className="text-blue-100 text-center mt-1">Transfer funds securely</p>
          </div>

          {/* Recipient Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <span className="text-blue-600 text-2xl font-semibold">
                  {nameUser.firstname?.charAt(0)}{nameUser.lastname?.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {nameUser.firstname} {nameUser.lastname}
              </h2>
              <p className="text-gray-500 text-sm">Recipient</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Send Money'
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              Transactions are secured with bank-level encryption
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SendMoney;