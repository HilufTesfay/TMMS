const changeToLowerCase = (collages) => {
  const keys = Object.keys(collages);
  const engineering = collages[keys[0]].departments.map((e) => e.toLowerCase());
  const science = collages[keys[1]].departments.map((e) => e.toLowerCase());
  const staff = collages[keys[2]].departments.map((e) => e.toLowerCase());
  return [...engineering, ...science, ...staff];
};
export { changeToLowerCase };
