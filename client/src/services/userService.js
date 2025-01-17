import axios from "axios";
const serverUrl = "http://127.0.0.1:3000/v1/user";
const getUsers = async () => {
  try {
    const response = await axios.get(serverUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getUsers;
