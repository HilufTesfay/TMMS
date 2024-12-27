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
//define function to create user
export default { createUser };
