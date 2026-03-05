import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

 
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  
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

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-xl rounded-xl w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
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
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-3"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            {isLogin ? "New user?" : "Already have account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 cursor-pointer ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;