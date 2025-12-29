import { useAuth } from "../hooks/useAuth.jsx";
import Login from "../pages/auth/Login";
import UnAuthorized from "../components/ui/UnAuthorized.jsx";

function ProtectedRoutes({ children, allowedRoles = [] }) {
  const { isAuthenticated, currentUser } = useAuth();
  console.log(currentUser);
  if (!isAuthenticated) {
    return <Login />;
  }

  if (
    allowedRoles.length > 0 &&
    (!currentUser?.roles ||
      !currentUser.roles.some((role) => allowedRoles.includes(role)))
  ) {
    return <UnAuthorized />;
  }

  return children;
}

export default ProtectedRoutes;
