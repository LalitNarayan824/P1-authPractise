import React, { useContext, useState } from "react";
import dog2 from "../assets/dog2.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AppContent } from "../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setIsLoggedIn , getUserData , isLoggedIn, userData} = useContext(AppContent);

  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
      isLoggedIn && userData && navigate('/')
    }, [isLoggedIn , userData])

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "sign up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData()
          toast(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          toast(data.message)
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred");
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
      <h1 className="font-extrabold uppercase  text-6xl text-amber-900 m-10">
        {state === "sign up" ? "Create Your Account" : "Login To Your Account"}
      </h1>
      <div className="flex items-center justify-center px-20">
        <img src={dog2} alt="dog" className="h-150 w-150 " />
        <div className="flex items-center justify-center">
          <form
            action=""
            className="bg-amber-950 text-amber-50 rounded-lg shadow-lg p-8 w-80 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              {state === "sign up" ? "Create Account" : "Login to Account"}
            </h2>
            {state === "sign up" && (
              <div>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Full name"
                  required
                  className="w-full p-2 rounded mb-2 text-amber-50 bg-amber-900 placeholder-amber-200"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email here"
                required
                className="w-full p-2 rounded mb-2 text-amber-50 bg-amber-900 placeholder-amber-200"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password here"
                required
                className="w-full p-2 rounded mb-2 text-amber-50 bg-amber-900 placeholder-amber-200"
              />
            </div>
            <p
              onClick={() => navigate("/reset-pass")}
              className="text-right text-xs text-amber-300 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
            <button
              onClick={onSubmitHandler}
              className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              {state}
            </button>
            <div className="flex flex-col items-center mt-2 gap-1">
              {state === "sign up" ? (
                <p className="text-sm">
                  Already have an account?{" "}
                  <span
                    className="text-amber-300 cursor-pointer hover:underline"
                    onClick={() => setState("login")}
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm">
                  Don't have an account?{" "}
                  <span
                    className="text-amber-300 cursor-pointer hover:underline"
                    onClick={() => setState("sign up")}
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
