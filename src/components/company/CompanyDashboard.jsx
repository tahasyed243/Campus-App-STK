import { useEffect, useState } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { Button } from "../ui/button";
import { Users, Trash2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state add karo
  const db = getDatabase();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const companyId = user?.uid;

  // Fetch company jobs
  const fetchJobs = async () => {
    if (!companyId) return;
    
    try {
      setLoading(true);
      const snap = await get(ref(db, "jobs/"));
      if (snap.exists()) {
        const allJobs = snap.val();
        console.log("All jobs data:", allJobs); // ✅ Debug ke liye
        
        const list = Object.keys(allJobs)
          .map((id) => ({ id, ...allJobs[id] }))
          .filter((job) => job.companyId === companyId)
          .reverse();
        
        console.log("Filtered company jobs:", list); // ✅ Debug ke liye
        setJobs(list);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [companyId]);

  const deleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await remove(ref(db, `jobs/${id}`));
      toast.success("Job removed successfully");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-purple-700">
          Company Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-lg">Manage your job postings</p>

        {/* New Job Button */}
        <Button
          className="mb-5 px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          onClick={() => navigate("/jobs/create")}
        >
          + Post New Job
        </Button>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No jobs posted yet.
            </p>
            <Button
              onClick={() => navigate("/jobs/create")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Post Your First Job
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2 text-purple-800 line-clamp-2">
                    {job.title || "Untitled Job"}
                  </h2>
                  
                  {/* ✅ CORRECTED: description use karo, jobDesc nahi */}
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {job.description || job.jobDesc || "No description available"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.location && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        📍 {job.location}
                      </span>
                    )}
                    {job.jobType && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        🕒 {job.jobType}
                      </span>
                    )}
                    {job.salary && (
                      <span className="text-sm bg-green-100 px-2 py-1 rounded text-green-800">
                        💰 {job.salary}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    Posted on: {new Date(job.createdAt || job.postedAt || Date.now()).toLocaleDateString()}
                  </p>
                  
                  {/* Applicants count */}
                  <p className="text-sm text-gray-600 mt-2">
                    👥 {job.applications?.length || 0} applicants
                  </p>
                </div>

                <div className="flex justify-between mt-5 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-purple-600 border-purple-600 hover:bg-purple-50"
                    onClick={() => navigate(`/jobs/${job.id}/applicants`)}
                  >
                    <Users size={16} /> View Applicants
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => deleteJob(job.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDashboard;