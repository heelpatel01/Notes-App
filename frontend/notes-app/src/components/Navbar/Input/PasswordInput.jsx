import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] border-green-600 px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 text-green-400 border-none rounded outline-none placeholder-green-500"
      />

      {isShowPassword ? (
        <FaRegEyeSlash
          size={22}
          className="text-green-400 cursor-pointer hover:text-green-300"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEye
          size={22}
          className="text-green-400 cursor-pointer hover:text-green-300"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
}

export default PasswordInput;
