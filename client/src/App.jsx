import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/verify-email' element={<EmailVerify/>}></Route>
        <Route path='/reset-pass' element={<ResetPassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App
