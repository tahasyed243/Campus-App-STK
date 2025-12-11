import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Wait until redux_state loads

    // Not logged in → send to login
    if (!user) {
      navigate("/");
      return;
    }

    // Wrong role → send to dashboard
    if (role && user.role !== role) {
      navigate("/dashboard");
      return;
    }
  }, [user, role, isLoading, navigate]);

  // While loading → show nothing (prevents flickering)
  if (isLoading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
