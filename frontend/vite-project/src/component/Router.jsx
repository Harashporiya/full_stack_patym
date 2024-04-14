import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import App from '../App'
import Login from './Login'
import Home from './Home'
import SendMoney from './SendMoney'
function Router() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/sendmoney' element={<SendMoney/>}/>
        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Router
