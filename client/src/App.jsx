import React from 'react'
import SignUp from './components/signup/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./components/login/LoginUser"
import UserProfile from './components/profile/UserProfile'
import VerifyOTP from './components/otpVerification/VerifyOTP'
import LoginOtpVerify from "./components/otpVerification/LoginOtpVerify"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<SignUp/>}/>
          <Route path = "/verifyOtp" element={<VerifyOTP/>}/>
          <Route path = "/LoginOtpVerify" element={<LoginOtpVerify/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App











