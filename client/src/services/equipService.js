import axios from "axios";
const serverUrl = "http://127.0.0.1:3000/v1/equip";

const getEquipmens = async () => {
  try {
    const response = await axios.get(serverUrl);
    return response.data;
  } catch (error) {
    console.log("fecthing error", error);
    throw error;
  }
};
export default { getEquipmens };
