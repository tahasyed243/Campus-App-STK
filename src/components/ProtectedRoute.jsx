import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (role && user.role !== role) {
      navigate("/login"); // unauthorized ko simple home bhejo
    }
  }, [user, role, isLoading, navigate]);

  if (isLoading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
