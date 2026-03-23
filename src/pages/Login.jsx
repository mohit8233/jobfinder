import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // ✅ Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Redirect result
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-slate-400 p-8 shadow-xl rounded-xl w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 mb-3 text-white"
            >
              Login
            </button>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>

          {/* 🔥 Go to Signup */}
          <p className="text-center mt-4 text-sm">
            New user?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer ml-1"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;