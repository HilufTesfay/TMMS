import Joi from "joi";
//define change password schema
const resetPassword = {
  params: {
    id: Joi.string().required().custom(validateObjectId),
  },
  body: {
    currentPassword: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8).custom(validatePassword),
  },
};
export default { resetPassword };
