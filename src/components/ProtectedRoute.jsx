import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;