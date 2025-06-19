import { useContext } from "react";
import dog1 from "../assets/dog1.png";
import strawberry from "../assets/strawberry1.png"
import { AppContent } from "../context/AppContext";
const Header = () => {

  const {userData} = useContext(AppContent)

  return (
    <div className="flex items-center justify-center h-auto">

      {userData ? <img src={strawberry} alt="strawberry1" className="h-150 w-150 object-contain mb-3" /> : <img src={dog1} alt="dog1" className="h-150 w-150 object-contain mb-3" />}
      
      <div>
        <h1 className="text-5xl font-extrabold m-5">Hey {userData ? userData.name : "developer"}</h1>
        <h2 className="text-3xl font-bold m-3">Welcome to our website</h2>
        <p className="mb-5">
          Lets get you a quick tour , and get you running in no time
        </p>
        <p className="font-light text-sm">In this Webiste , you register your account with your email , <br/>make sure you use a real email id coz youll receive otp on that email ,<br/> you can login , logout , verify your account via email , and even reset your password via email.<br/>
          I hope you like the website , it was my first time learning authorization and authentication , XOXO Peace Out
        </p>
      </div>
    </div>
  );
};

export default Header;
