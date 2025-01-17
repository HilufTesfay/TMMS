import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoute;
