import React, { useState } from 'react';

const SendMoney = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:4444/sendmoney/send",{
       cardNumber,
       amount,
    })
    setAmount("");
    setCardNumber("");
    console.log(response.data);
    }catch(error){
      console.log("Error",error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-sky-600 flex justify-center items-center">
      <div className="max-w-4xl w-full">
        
        <div className=" md:w-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-sky-700/20 p-6">
          <h2 className="text-2xl font-bold text-center text-sky-900 mb-6">
            Send Money
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-sky-900">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
                className="w-full px-4 py-2 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-sky-900">
                Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ease-in-out"
            >
              Send Money
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;