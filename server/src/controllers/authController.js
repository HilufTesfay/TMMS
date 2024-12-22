import { tokenService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
//define register middleware
const register = handleCatchError(async (req, res) => {
  const admin = await authService.register(req.body);
  if (!user) {
    return res.status(404).send("unable to register");
  }
  const tokens = await tokenService.generateAuthToken(user.id, user.role);
  res.status(201).json({
    user: admin,
    tokens,
  });
});
//define login middleware
const logIn = handleCatchError(async (req, res) => {
  const user = await authService.login(req.body);
  if (!user) {
    return res.status(404);
  }
  res.status(200).json({ token });
});
//define logOut middleware
const logOut = handleCatchError(async (req, res) => {
  await authService.logout(req.user);
  res.status(204).send();
});

export { register, logIn, logOut };
