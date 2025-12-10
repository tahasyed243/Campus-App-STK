import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";

import { db } from "@/utils/constant";
import { ref, push, set } from "firebase/database";
import Footer from "../shared/Footer";

const PostJob = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: user?.uid || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    // validate on change
    let error = "";
    if (value.trim() === "" && ["title", "description", "requirements", "salary", "location", "jobType"].includes(name)) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === "experience" && (value === "" || value < 0)) {
      error = "Experience must be a positive number";
    } else if (name === "position" && (value === "" || value <= 0)) {
      error = "Number of positions must be greater than 0";
    }

    setErrors({ ...errors, [name]: error });
  };

  const validateAllFields = () => {
    const newErrors = {};
    if (!input.title.trim()) newErrors.title = "Title is required";
    if (!input.description.trim()) newErrors.description = "Description is required";
    if (!input.requirements.trim()) newErrors.requirements = "Requirements are required";
    if (!input.salary.trim()) newErrors.salary = "Salary is required";
    if (!input.location.trim()) newErrors.location = "Location is required";
    if (!input.jobType.trim()) newErrors.jobType = "Job type is required";
    if (input.experience === "" || input.experience < 0) newErrors.experience = "Experience must be a positive number";
    if (input.position === "" || input.position <= 0) newErrors.position = "Number of positions must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "company") {
      toast.error("Only companies can post jobs!");
      return;
    }

    if (!validateAllFields()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const newJobRef = push(ref(db, "jobs"));
      await set(newJobRef, {
        ...input,
        companyId: user.uid,
        companyName: user.fullname,
        createdAt: Date.now(),
        applications: [],
        status: "pending",
      });

      toast.success("Job posted successfully!");
      navigate("/company/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center w-screen my-5">
        <button
          onClick={() => navigate(-1)}
          className="self-start ml-10 mb-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Requirements", name: "requirements", type: "text" },
              { label: "Salary", name: "salary", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Job Type", name: "jobType", type: "text" },
              { label: "Experience (Years)", name: "experience", type: "number" },
              { label: "No of Positions", name: "position", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <Label>{field.label}*</Label>
                <Input
                  type={field.type}
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                  min={field.type === "number" ? 0 : undefined}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
