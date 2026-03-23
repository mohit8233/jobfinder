import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // ✅ Email Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Save Name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Google Signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-xl w-96">

          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
            Sign Up
          </h2>

          <form onSubmit={handleSignup}>
            
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-2  rounded 
              bg-blue-100 text-black 
              dark:bg-gray-700 dark:text-white 
              placeholder-gray-600 dark:placeholder-gray-300 
              outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-2  rounded 
              bg-blue-100 text-black 
              dark:bg-gray-700 dark:text-white 
              placeholder-gray-600 dark:placeholder-gray-300 
              outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2  rounded 
              bg-blue-100 text-black 
              dark:bg-gray-700 dark:text-white 
              placeholder-gray-600 dark:placeholder-gray-300 
              outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-3"
            >
              Sign Up
            </button>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-sm dark:text-gray-300">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;