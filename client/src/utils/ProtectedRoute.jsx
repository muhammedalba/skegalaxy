import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
const ProtectedRoute = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const role = cookies.get("role")?.toLowerCase();
console.log(token);

  // Redirect to login if token is not found
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is admin or manager
  if (token && (role === 'admin' || role === 'manger')) {
    return children ? children : <Outlet />;
  }

  // Default redirect for users without proper role
  return <Navigate to="/" replace />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node, 
};

export default ProtectedRoute;
