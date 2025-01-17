import { userService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
//define function to create user
const createUser = handleCatchError(async (req, res) => {
  const user = await userService.createUser(req.body);
  if (!user) {
    return res.status(400).json({ message: "user not created" });
  }
  return res.status(201).json({ message: "user created", user });
});
//define function to update  user

const updateUser = handleCatchError(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const { message, user } = await userService.updateUser(updateData, id);
  res.status(202).json({
    message: message,
    user: user,
  });
});
//get users
const getUsers = handleCatchError(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});
export default { createUser, updateUser, getUsers };
