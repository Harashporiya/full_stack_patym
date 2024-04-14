import React from 'react'

function SendMoney() {
  return (
    <div className='bg-sky-400 h-screen flex items-center'>
      <div>
      <img className='p-3 ' src='https://i.ytimg.com/vi/ssUHw771EcA/maxresdefault.jpg' alt=''/>
      </div>
      <div className='ml-9 border-4 border-sky-900 p-3   text-white font-semibold text-xl' >
        <p className='flex justify-center'>Send Money</p>
        
        <p>UserNamae</p>
        <form className=''>
          <div className='p-1'>
          <input className='p-2 text-black text-xl' type='text' placeholder='card number'/>
          </div>
          <br/>
          <div className='p-1'>
          <input className='p-2 text-black' type='text' placeholder='amount'/>
          </div>
        </form>
       
      </div>
     
    </div>
  )
}

export default SendMoney
