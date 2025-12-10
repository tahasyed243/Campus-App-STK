import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoading } from "@/redux/authSlice";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // AUTO RESTORE USER FROM LOCALSTORAGE
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser && !user) {
      dispatch(setUser(JSON.parse(savedUser)));   // restore user
      return;
    }

    dispatch(setLoading(false)); // Stop loading if no saved user
  }, [user, dispatch]);

  // ROLE + AUTH CHECK
  useEffect(() => {
    if (isLoading) return;

    // Agar user nahi mila → login par jao
    if (!user) {
      navigate("/login");
      return;
    }

    // Agar role restricted hai aur match nahi kar raha
    if (role && user.role !== role) {
      navigate("/");
    }
  }, [user, role, isLoading, navigate]);

  // Jab tak user restore ho raha hai → blank return
  if (isLoading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
