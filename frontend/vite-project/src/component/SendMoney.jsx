import React, { useState } from 'react'
import axios from 'axios'
import "./index.css"
function SendMoney() {
  const [cardNumber, setcardNumber] = useState();
  const [amount, setAmount] = useState();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:4444/sendmoney/send",{
       cardNumber,
       amount,
    })
    setAmount("");
    setcardNumber("");
    console.log(response.data);
    }catch(error){
      console.log("Error",error)
    }
  }
  return (
    <>
    <div id='black'> </div>
    <div  className='bg-sky-400 h-screen flex items-center'>
      <div>
      <img className='p-3 ' src='https://i.ytimg.com/vi/ssUHw771EcA/maxresdefault.jpg' alt=''/>
      </div>
      <div className='ml-9 border-4 border-sky-900 p-3   text-white font-semibold text-xl' >
        <p className='flex justify-center'>Send Money</p>
        
        <p>UserNamae</p>
        <form onSubmit={handleSubmit} className=''>
          <div className='p-1'>
          <input className='p-2 text-black text-xl  outline-none focus:border-2 focus:border-sky-800' value={cardNumber} onChange={(e)=>setcardNumber(e.target.value)} type='text' placeholder='card number'/>
          </div>
          <br/>
          <div className='p-1'>
          <input className='p-2 text-black  outline-none focus:border-2 focus:border-sky-800' type='text' placeholder='amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          </div>
          <button className='bg-sky-700 rounded-xl p-4 font-semibold text-2xl hover:bg-sky-900'>Send</button>
        </form>
       
      </div>
     
    </div>
   
    </>
  )
}

export default SendMoney
