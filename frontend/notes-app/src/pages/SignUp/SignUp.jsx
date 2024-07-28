import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Navbar/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

function SignUp() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState(null);

 const handleSignup = (e) => {
  e.preventDefault();

  if (!name) {
   setError("Please enter your name.");
   return;
  }

  if (!validateEmail(email)) {
   setError("Please enter your email");
   return;
  }

  if (!password) {
   setError("Please enter your password");
   return;
  }

  setError("");

  //Signup API Call
 };
 return (
  <>
   <Navbar />
   <div className="flex items-center justify-center mt-28">
    <div className="w-96 border rounded bg-white px-7 py-10">
     <h4 className="text-2xl mb-7">Signup</h4>
     <form onSubmit={handleSignup}>
      <input
       type="text"
       placeholder="Name"
       className="input-box"
       value={name}
       onChange={(e) => {
        setName(e.target.value);
       }}
      />

      <input
       type="text"
       placeholder="Email"
       className="input-box"
       value={email}
       onChange={(e) => {
        setEmail(e.target.value);
       }}
      />

      <PasswordInput
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button type="submit" className="btn-primary">
       Create an account
      </button>

      <p className="text-sm text-center mt-4">
       Already have account?{" "}
       <Link to="/login" className="font-medium text-primary underline">
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
