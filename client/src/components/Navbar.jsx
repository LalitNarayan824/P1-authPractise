import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";


const Navbar = () => {
  const { userData , backendUrl , setIsLoggedIn , setUserData } = useContext(AppContent);

  const navigate = useNavigate();
  
  const Logout = async ()=>{
    try {
      axios.defaults.withCredentials=true;
      const {data}= await axios.post(backendUrl + '/api/auth/logout' )

      data.success && setIsLoggedIn(false)
      data.success && setUserData(false)
      toast(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendVerifyOtp = async ()=>{
    try {
      
      axios.defaults.withCredentials=true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      console.log('sent verification otp')

      if(data.success){
        navigate('/verify-email')
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="w-full flex justify-end items-center px-20 p-4 bg-amber-400 h-25 ">
      <img
        src={logo}
        alt="Logo"
        className="spin-360 h-70 w-70 object-contain absolute top-5 left-5"
      />
      {/* <span>Lalit's Website</span> */}

      {userData ? (
        <div className="flex gap-3">
          <div>
            <h3 className="font-extrabold text-2xl">{userData.name}</h3>
            <h4 className="font-bold text-xl"> {userData.email}</h4>
            {userData.isAccountVerified ? <p className="font-light"> Your account is verified !</p> : <p className="font-light"> Your account NOT is verified !</p>}
          </div>

          {!userData.isAccountVerified && <button onClick={()=>sendVerifyOtp()} className="flex items-center gap-2 px-3 py-2 font-bold border border-gray-700 rounded-full bg-amber-500 text-gray-700 hover:bg-amber-400 transition-all">
            Verify Email
          </button>}
          <button onClick={()=> Logout()} className="flex items-center gap-2 px-3 py-2 font-bold border border-gray-700 rounded-full bg-amber-500 text-gray-700 hover:bg-amber-400 transition-all">
            Logout
          </button>
          

        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-6 py-3 font-bold border border-gray-700 rounded-full bg-amber-500 text-gray-700 hover:bg-amber-400 transition-all"
        >
          Login{" "}
        </button>
      )}
    </div>
  );
};

export default Navbar;
