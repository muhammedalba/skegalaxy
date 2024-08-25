import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({   children }) => {
const cookies= new Cookies();
 const token = cookies.get("token");
 const role = cookies.get("role")?.toLowerCase();


const redirectPath = "/login";

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (token && role === 'admin' || role === 'manger') {
    return children ? children : <Outlet />;
  }
  // if (token && role === 'user') {
  //   return children ? children : <Outlet />;
  // }
  return <Navigate to="/" replace />;

};

export default ProtectedRoute;
