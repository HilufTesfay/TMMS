import axios from "axios";
import { validateFormData } from "../utils";
const serverUrl = "http://127.0.0.1:3000/v1/user";
const getUsers = async () => {
  const userIds = {};
  try {
    const response = await axios.get(serverUrl);
    const users = response.data.users;
    console.log(users);
    users.forEach((user) => {
      userIds[user.userId] = user.id;
    });
    localStorage.setItem("userIds", JSON.stringify(userIds));
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
//update users
const updateUser = async ({ updateData }) => {
  const id = await getUserId(updateData.userId);
  updateData.id = id;
  try {
    const response = await axios.put(serverUrl, updateData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// get user by id
const getUserId = (userId) => {
  const userIds = JSON.parse(localStorage.getItem("userIds")) || {};
  return userIds[userId];
};
//submit
const handleSubmit = async (event, formData, setError, setMessage) => {
  event.preventDefault();

  const errors = validateFormData(formData);
  setError(errors);

  if (Object.keys(errors).length === 0) {
    try {
      const response = await axios.post(serverUrl, {
        ...formData,
      });
      if (!response.status.toString().startsWith("2")) {
        throw new Error(response.data.message || "Registration failed");
      }
      const message = response.data.message;
      console.log("Registration successful:", message);
      setMessage({ success: message });
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error("Error during registration:", error);
      setError({ general: error.response.data.message });
    }
  }
};
export default { getUsers, updateUser, getUserId, handleSubmit };
