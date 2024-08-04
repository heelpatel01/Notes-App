import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Navbar/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 const handleSignup = async (e) => {
  e.preventDefault();

  if (!name) {
   setError("Please enter your name.");
   return;
  }

  if (!validateEmail(email)) {
   setError("Please enter a valid email.");
   return;
  }

  if (!password) {
   setError("Please enter your password.");
   return;
  }

  setError("");

  try {
   const response = await axiosInstance.post("/create-user", {
    fullName: name,
    email: email,
    password: password,
   });

   if (response.data && response.data.accessToken) {
    localStorage.setItem("token", response.data.accessToken);
    navigate("/dashboard");
   }
  } catch (error) {
   if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message);
    console.log("Error in Signup");
   } else {
    setError("An unexpected error occurred. Please try again!");
    console.log("Error in Signup Else");
   }
  }
 };

 return (
  <>
   <Navbar />
   <div className="flex items-center justify-center min-h-screen bg-gray-900 text-green-400">
    <div className="w-96 bg-gray-800 border border-green-600 rounded-lg px-7 py-10 shadow-lg">
     <h4 className="text-3xl mb-7 font-mono">Signup</h4>
     <form onSubmit={handleSignup}>
      <input
       type="text"
       placeholder="Name"
       className="w-full bg-gray-700 border border-green-500 text-green-400 placeholder-green-300 rounded-md px-4 py-2 mb-4"
       value={name}
       onChange={(e) => setName(e.target.value)}
      />

      <input
       type="text"
       placeholder="Email"
       className="w-full bg-gray-700 border border-green-500 text-green-400 placeholder-green-300 rounded-md px-4 py-2 mb-4"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full bg-gray-700 border border-green-500 text-green-400 placeholder-green-300 rounded-md px-4 py-2 mb-4"
      />

      {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

      <button
       type="submit"
       className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
      >
       Create an account
      </button>

      <p className="text-sm text-center mt-4 text-gray-400">
       Already have an account?{" "}
       <Link to="/login" className="font-medium text-green-400 underline">
        Login
       </Link>
      </p>
     </form>
    </div>
   </div>
  </>
 );
}

export default SignUp;
