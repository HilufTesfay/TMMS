import Joi from "joi";
import { validateObjectId, validatePassword } from "./customValidation.js";

//define schema for reset-password
const resetPassword = {
  body: {
    id: Joi.string().trim().required().custom(validateObjectId),
    currentPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required().min(8).custom(validatePassword),
  },
};
// define schema for login user
const login = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

//define schema for forgeot password

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
  }),
};

//define schema for routes that use id
const id = {
  body: Joi.object().keys({
    id: Joi.string().trim().required().custom(validateObjectId),
  }),
};
//define schema for change email,
const changeEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    newEmail: Joi.string().email().required(),
  }),
};
export default { resetPassword, login, forgotPassword, id, changeEmail };
