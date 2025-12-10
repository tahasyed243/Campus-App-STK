import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, db } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { isLoading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Email and Password are required!");
      return;
    }

    dispatch(setLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      const firebaseUser = userCredential.user;

      const snapshot = await get(child(ref(db), "users/" + firebaseUser.uid));

      if (!snapshot.exists()) {
        toast.error("No user data found.");
        dispatch(setLoading(false));
        return;
      }

      const userData = snapshot.val();

      if (userData.status !== "approved") {
        toast.error("Your account is not approved by Admin.");
        dispatch(setLoading(false));
        return;
      }

      if (userData.isDeleted || userData.status === "blocked") {
        toast.error("Your account has been blocked by Admin.");
        dispatch(setLoading(false));
        return;
      }

      const finalUser = {
        fullname: userData.fullname,
        email: userData.email,
        uid: firebaseUser.uid,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
      };

      dispatch(setUser(finalUser));
      localStorage.setItem("user", JSON.stringify(finalUser));

      toast.success("Login successful!");

      if (userData.role === "admin") navigate("/admin/dashboard");
      else if (userData.role === "company") navigate("/company/dashboard");
      else navigate("/");

    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="md:w-1/2 w-full bg-gray-900 flex flex-col 
      items-center justify-center text-white p-10">
        <img src="STK Logo White.png" alt="STK" className="w-60 h-60 mb-6" />
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-300 text-lg text-center">
          Login to continue accessing your Campus App dashboard.
        </p>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 w-full flex items-center
      justify-center bg-amber-100 md:bg-amber-100">
        <form
          onSubmit={submitHandler}
          className="w-96 h-fit shadow-lg rounded-2xl p-6 bg-gray-100"
        >
          <h1 className="font-bold text-3xl mb-5 text-center">Login</h1>

          <div className="my-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-900 duration-700 text-white"
          >
            Login
          </Button>

          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
