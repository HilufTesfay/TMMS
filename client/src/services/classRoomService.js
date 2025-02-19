import axios from "axios";
const serverUrl = "http://127.0.0.1:3000/v1/class";
// Define function to get classrooms
const getClassRooms = async () => {
  try {
    const response = await axios.get(serverUrl);
    console.log("rooms", response.data);
    return formatResponseData(response.data);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};

// Format response data
const formatResponseData = (data) => {
  return data.map((room) => ({
    ...room,
    isTaken: room.isTaken ? "Taken  " : "Available",
  }));
};
// get available class
const getAvailableRooms = async () => {
  try {
    const respons = await axios.get(`${serverUrl}/available`);
    if (respons.data.roomNumber !== null) {
      setRooms(respons.data);
    }
    return respons.data;
  } catch (error) {
    console.log(" class-room feching error", error);
    throw error;
  }
};
//const store  class room
const setRooms = (rooms) => {
  const roomMap = {};
  rooms.forEach((room) => {
    roomMap[`${room.blockNumber}${room.roomNumber}`] = room;
  });
  localStorage.setItem("rooms", JSON.stringify(roomMap));
  console.log("Rooms stored successfully");
};

// get rooms
const getRooms = () => {
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  return rooms;
};
// get specific room
const getSectedRoom = (key) => {
  const rooms = getRooms();
  return rooms[key];
};
//get equipments
const getEquipments = (blck) => {
  return blck;
};
export default {
  getClassRooms,
  getAvailableRooms,
  getRooms,
  getEquipments,
  getSectedRoom,
};
