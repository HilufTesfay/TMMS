import bcrypt from "bcryptjs";
function hashPassword(schema) {
  schema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });
}
export { hashPassword };
