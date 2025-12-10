import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { db } from "@/utils/constant";
import { ref, update, get } from "firebase/database";
import Footer from "../shared/Footer";

const JobUpdate = () => {
  const { id } = useParams();
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
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch job by id
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = ref(db, `jobs/${id}`);
        const snapshot = await get(jobRef);
        if (snapshot.exists()) {
          setInput(snapshot.val());
        } else {
          toast.error("Job not found!");
          navigate("/company/jobs");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job.");
      }
    };
    fetchJob();
  }, [id, navigate]);

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

    if (!validateAllFields()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const jobRef = ref(db, `jobs/${id}`);
      await update(jobRef, {
        ...input,
        updatedAt: Date.now(),
      });

      toast.success("Job updated successfully!");
      navigate("/company/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <form onSubmit={submitHandler} className="p-8 border shadow rounded-md">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/company/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Requirements", name: "requirements", type: "text" },
              { label: "Salary", name: "salary", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Job Type", name: "jobType", type: "text" },
              { label: "Experience", name: "experience", type: "number" },
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
              Update Job
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default JobUpdate;
