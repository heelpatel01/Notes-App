import React from "react";
import { getInitials } from "../../utils/helper";

function ProfileInfo({ onLogout, userInfo }) {
  return (
    <div className="flex items-center gap-3 text-green-400">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-green-400 font-medium border-2 border-green-600">
        {getInitials(userInfo?.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <button
          className="text-sm text-green-400 underline hover:text-green-300"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
