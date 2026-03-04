import React from "react";
import { auth } from "../firebase";

const Profile = () => {
  const user = auth.currentUser;

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl">
        Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-2">
          {user.displayName || "User"}
        </h2>

        <p className="text-gray-600 mb-4">{user.email}</p>

        <div className="bg-blue-50 p-3 rounded-lg text-sm">
          <p><strong>User ID:</strong></p>
          <p className="break-all">{user.uid}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;