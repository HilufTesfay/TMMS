import { FaUser, FaLock } from "react-icons/fa";
import { Input, Button } from "../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevents page reload
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Perform login logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <form
        className="flex flex-col justify-center w-full gap-6"
        onSubmit={handleButtonClick}
      >
        <Input
          icon={FaUser}
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          icon={FaLock}
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button text="Login" type="submit" />
      </form>
      <Link to="/forgot-password" className="text-blue-500 hover:underline">
        Forgot password?
      </Link>
    </div>
  );
};

export default Login;
