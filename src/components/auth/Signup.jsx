import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/utils/constant";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // ✅ FRONTEND VALIDATION
    // -----------------------------
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.role === "admin") {
      toast.error("Admin creation is restricted!");
      return;
    }

    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;

      const userData = {
        fullname: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber || "",
        status: "pending", // Admin approval required
        isDeleted: false,
      };

      await set(ref(db, "users/" + uid), userData);

      toast.success("Signup request sent! Wait for admin approval.");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-10">
        <img src="STK Logo White.png" className="w-48 h-48 mb-4" alt="Logo" />
        <h1 className="text-4xl font-bold mb-3">Campus App</h1>
        <p className="text-lg text-center px-4">Create your account.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-amber-100 md:bg-amber-100
      flex justify-center items-center p-10">
        <form
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

          <label className="block mb-2 font-medium">Full Name</label>
          <input
            className="w-full border px-3 py-2 mb-4 rounded"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="block mb-2 font-medium">Email</label>
          <input
            className="w-full border px-3 py-2 mb-4 rounded"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="block mb-2 font-medium">Phone Number</label>
          <input
            className="w-full border px-3 py-2 mb-4 rounded"
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            className="w-full border px-3 py-2 mb-4 rounded"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="block mb-2 font-medium">Select Role</label>
          <select
            className="w-full border px-3 py-2 mb-4 rounded"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 rounded mt-2"
          >
            Signup
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-800 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
