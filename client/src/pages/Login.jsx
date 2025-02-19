import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { Input, Button } from "../components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [field, setField] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload
    if (!email || !password) {
      setField(true);
      return;
    }
    setField(false);
    try {
      const response = await authService.logIn(email, password);
      console.log("response", response);
      console.log("tokens", response.tokens);
      console.log("role", response.role);
      if (response.role && response.tokens) {
        login();
        setMessage("Login successful");
        navigate("/");
      }
      console.log("login failed");
    } catch (error) {
      setError(
        "Login error: " + (error.response?.data?.message || error.message)
      );
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mt-2 mb-2 ml-auto mr-auto bg-gradient-to-br from-white to-blue-50 px-8 py-10 my items-center rounded-xl shadow-xl w-full max-w-md sm:px-12 sm:py-14 md:max-w-lg lg:max-w-xl">
      {message && <p className="text-green-500">{message}</p>}
      <h1 className="text-3xl font-extrabold text-blue-600 mb-4 sm:text-4xl md:mb-6">
        Welcome Back!
      </h1>
      <p className="text-gray-600 text-center mb-8 sm:mb-10">
        Please sign in to continue
      </p>
      <form
        className="flex flex-col w-full gap-6 items-center justify-center"
        onSubmit={handleFormSubmit}
      >
        <Input
          icon={FaUser}
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <div className="relative p-0">
          <Input
            icon={FaLock}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-blue-500 hover:text-blue-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {field && <p className="text-red-500">Please enter your credentials</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Button text="Sign In" type="submit" />
      </form>
      <div className="flex justify-between w-72 text-sm text-gray-500 mt-4 ">
        <Link to="/forgot-password" className="hover:text-blue-500">
          Forgot Password?
        </Link>
        <Link to="/signup" className="hover:text-blue-500 text-gray-500">
          Create Account
        </Link>
      </div>
      <div className="flex items-center gap-2 mt-8">
        <span className="h-px w-20 bg-gray-300"></span>
        <span className="text-gray-400">or continue with</span>
        <span className="h-px w-20 bg-gray-300"></span>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-blue-100">
          <SiGoogle className="w-5 h-5 text-3xl text-gray-500" />
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
