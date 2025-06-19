import React, { useContext, useEffect, useState } from "react";
import pig1 from "../assets/pig1.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AppContent } from "../context/AppContext";

import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl, IsLoggedIn, getUserData, isLoggedIn, userData } =
    useContext(AppContent);

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    isLoggedIn && userData && navigate('/')
  }, [isLoggedIn , userData])

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // handler for submitting otp
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (emailSent) {
        const otpArray = inputRefs.current.map((el) => (el ? el.value : ""));
        const otp = otpArray.join("");
        if (otp.length !== 6 || otpArray.some((val) => val === "")) {
          toast.error("Please enter all 6 digits of the OTP.");
          return;
        }
        console.log(otp , newPassword , email)
        const { data } = await axios.post(
          backendUrl + "/api/auth/reset-password",
          {
            otp,
            newPassword,
            email,
          }
        );

        if (data.success) {
          toast.success(data.message + ", login with your new email");
          
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } 
      else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/send-reset-otp",
          {
            
            email,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setEmailSent(true);
          
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
  toast.error(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="flex flex-col min-h-screen text-center bg-amber-400">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="spin-360 h-70 w-70 object-contain absolute top-5 left-5"
      />
      <h1 className="font-extrabold uppercase text-6xl text-amber-900 m-10">
        RESET YOUR PASSWORD
      </h1>
      <div className="flex items-center justify-center px-20">
        <img src={pig1} alt="dog" className="h-150 w-150 " />
        <div className="flex items-center justify-center">
          <form
            onSubmit={onSubmitHandler}
            className="bg-amber-950 text-amber-50 rounded-lg shadow-lg p-8 w-auto flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

            {emailSent ? (
              <h4>Enter new Password and otp</h4>
            ) : (
              <h4>Enter the email to recover</h4>
            )}

            {!emailSent && (
              <div>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email here"
                  required
                  className="w-auto p-2 rounded mb-2 text-amber-50 bg-amber-900 placeholder-amber-200"
                />
              </div>
            )}

            {emailSent && (
              <>
                <div>
                  <input
                    type="text"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder="New Password here"
                    required
                    className="w-full p-2 rounded mb-2 text-amber-50 bg-amber-900 placeholder-amber-200"
                  />
                </div>
                <div className="flex justify-between " onPaste={handlePaste}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      required
                      ref={(el) => (inputRefs.current[index] = el)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="border-amber-50 bg-amber-600 h-15 w-12 m-2 rounded-xl text-center text-3xl text-amber-950 font-bold"
                    />
                  ))}
                </div>
              </>
            )}

            <button className="bg-amber-700  text-2xl hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
