import { useState } from "react";
import { Input, Button } from "../components";
import { userService } from "../services";
const employmentTypes = ["full-time", "part-time", "contract"];
const colleges = {
  engineering: { departments: ["software", "electrical", "mechanical"] },
  science: { departments: ["physics", "maths", "chemistry"] },
  staff: { departments: ["ADMIN", "IT", "HR"] },
};
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employmentType: "",
    college: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCollegeChange = (event) => {
    const selectedCollege = event.target.value;
    setFormData({
      ...formData,
      college: selectedCollege,
      department: "", // Clear department when college changes
    });
  };

  return (
    <form
      onSubmit={(event) =>
        userService.handleSubmit(event, formData, setErrors, setMessage)
      }
      className="flex-col gap-10 justify-center mt-4 border shadow-md rounded-lg border-blue px-4 py-4"
    >
      <div className="text-red-500">
        {errors.general && <p>{errors.general}</p>}
        {message.success && <p className="text-green-500">{message.success}</p>}
      </div>
      <div className="flex gap-10 justify-center">
        <div className="con-input">
          <div className="form-group">
            <Input
              placeholder="user id"
              type="text"
              value={formData.userId}
              name="userId"
              onChange={handleChange}
            />
            {errors.userId && (
              <div className="invalid-feedback">{errors.userId}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              placeholder="First Name"
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              placeholder="Last Name"
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              placeholder="email"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              placeholder="phone Number"
              type="number"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="form-group">
            <Input
              placeholder="password"
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <Button text="register" type="submit" />
          </div>
        </div>
        <div className="con-dropdown">
          <div className="form-group drop-down">
            <select
              name="employmentType"
              id="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className={
                errors.employmentType
                  ? "form-control is-invalid"
                  : "form-control"
              }
            >
              <option value="">Select employment</option>
              {employmentTypes.map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group drop-down">
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleCollegeChange}
              className={
                errors.college ? "form-control is-invalid" : "form-control"
              }
            >
              <option value="">Select College</option>
              {Object.keys(colleges).map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            {errors.college && (
              <div className="invalid-feedback">{errors.college}</div>
            )}
          </div>
          <div className="form-group drop-down">
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={
                errors.department ? "form-control is-invalid" : "form-control"
              }
            >
              <option value="">Select Department</option>
              {formData.college &&
                colleges[formData.college].departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
            </select>
            {errors.department && (
              <div className="invalid-feedback">{errors.department}</div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
