import axios from "axios";
const API_URL = "http://localhost:3000/v1/auth/";

const logIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    const authTokens = response.data.tokens;
    const role = response.data.role;
    const name = response.data.name;
    const userId = response.data.userId;

    if (authTokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
      localStorage.setItem("userId", JSON.stringify(userId));
      setRole(role);
      setName(name);
      console.log("RESPONS", response.data.role);
      console.log("Respons", response.data.name);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data);
    return error.response.data;
  }
};

const logOut = async () => {
  try {
    const response = await axios.post(`${API_URL}logout`);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("role"); // Clear role on logout
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response.data);
    return error.response.data;
  }
};

const isLoggedIn = () => {
  const tokens = localStorage.getItem("authTokens");
  if (!tokens) return false;
  try {
    const parsedTokens = JSON.parse(tokens); // Parse tokens correctly
    console.log("access-token", parsedTokens.access);
    return !!parsedTokens.access;
  } catch (error) {
    console.log("error", error);
    console.error("Invalid token format");
    return false;
  }
};

const setRole = (role) => {
  localStorage.setItem("role", JSON.stringify(role));
};

const getRole = () => {
  const role = localStorage.getItem("role");
  const parsedRole = JSON.parse(role);
  return parsedRole;
};
const setName = (name) => {
  localStorage.setItem("firstName", JSON.stringify(name));
};
const getName = () => {
  const name = JSON.parse(localStorage.getItem("firstName"));
  return name;
};
const getUserId = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId;
};

export default { logIn, logOut, isLoggedIn, getRole, getName, getUserId };
