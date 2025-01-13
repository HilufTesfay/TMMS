import { tokenService, userService } from "../services/index.js";
import { handleCatchError, CustomError } from "../utils/index.js";
import { roleRight } from "../config/role.js";
import { envConfig } from "../config/config.js";

//middleware to check authenticcity of token
const auhenticate = async (req, res, next) => {
  try {
    const token = tokenService.extractToken(req.headers);
    const result = tokenService.isAuthenticatedToken(token);
    if (!result.isValidToken) {
      return res.status(403).json({
        message: "Authentication failed. Please log in first.",
        rediderct: `${envConfig.serverUrl}/v1/auth/login`,
      });
    }
    const user = await userService.getUserById(result.userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//middleware to check autherization
const ensure =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      const userRights = roleRight.get(req.user.role);
      const hasRight = requiredRights.every((right) =>
        userRights.includes(right)
      );
      if (!hasRight || !req.user) {
        return res.status(403).json({
          message: "you are not autherized to acess this API",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default { auhenticate, ensure };
