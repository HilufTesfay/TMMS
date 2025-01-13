const allRoles = {
  instructor: [""],
  admin: ["manageUsers"],
};
const roles = Object.keys(allRoles);
const roleRight = new Map(Object.entries(allRoles));
export { roles, roleRight };
