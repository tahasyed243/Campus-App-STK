import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "@/utils/constant";
import { ref, get, update, onValue } from "firebase/database";
import { setSingleJob } from "@/redux/jobSlice";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Calendar, Users, Award } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isApplied, setIsApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    if (user && jobId) {
      const applicationRef = ref(db, `jobs/${jobId}/applications/${user.uid}`);
      const unsubscribe = onValue(applicationRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setIsApplied(true);
          setApplicationStatus(data.status || 'Pending');
        } else {
          setIsApplied(false);
          setApplicationStatus(null);
        }
      });

      return () => unsubscribe();
    }
  }, [user, jobId]);

  const applyJobHandler = async () => {
    try {
      const jobRef = ref(db, `jobs/${jobId}`);
      const snapshot = await get(jobRef);
      const jobData = snapshot.val() || {};
      const existingApplications = jobData.applications || [];

      const alreadyApplied = existingApplications.some(
        (app) => app.applicantId === user.uid
      );
      if (alreadyApplied) {
        setIsApplied(true);
        toast.error("You have already applied for this job!");
        return;
      }

      const newApplication = {
        applicantId: user.uid,
        email: user.email,
        fullname: user.fullname,
        phoneNumber: user.phoneNumber,
        status: "Pending",
        appliedAt: Date.now(),
      };

      await update(jobRef, {
        applications: [...existingApplications, newApplication],
      });

      setIsApplied(true);
      setApplicationStatus("Pending")

      dispatch(
        setSingleJob({
          ...jobData,
          id: jobId,
          applications: [...existingApplications, newApplication],
        })
      );
      dispatch(setAllApplicants([...existingApplications, newApplication]));

      toast.success("Applied successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const jobRef = ref(db, `jobs/${jobId}`);
        const snapshot = await get(jobRef);
        if (snapshot.exists()) {
          const jobData = snapshot.val();

          dispatch(setSingleJob({ id: jobId, ...jobData }));
          dispatch(setAllApplicants(jobData.applications || []));

          const alreadyApplied = jobData.applications?.some(
            (app) => app.applicantId === user?.uid
          );
          setIsApplied(alreadyApplied);

          if (alreadyApplied && user?.uid) {
            const userApplication = jobData.applications.find(
              (app) => app.applicantId === user.uid
            );
            setApplicationStatus(userApplication?.status || 'Pending');
          }
        } else {
          toast.error("Job not found!");
          navigate('/jobs');
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch, user?.uid, navigate]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div
          className="flex items-center gap-2 cursor-pointer mb-4 hover:text-purple-700 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </div>

        {/* Compact Job Header */}
        <div className="bg-white rounded-lg border p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 line-clamp-2">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs px-2 py-0">
                  {singleJob?.position} Position
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-600 text-xs px-2 py-0">
                  {singleJob?.jobType}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs px-2 py-0">
                  {singleJob?.salary}
                </Badge>
              </div>
            </div>
            <div className="shrink-0 mt-2 sm:mt-0">
              <Button
                onClick={applyJobHandler}
                disabled={isApplied}
                size="sm"
                className={`text-sm font-medium ${isApplied
                    ? applicationStatus === 'Accepted'
                      ? "bg-green-600 hover:bg-green-700"
                      : applicationStatus === 'Rejected'
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    : "bg-[#7209b7] hover:bg-[#5f32ad]"
                  }`}
              >
                {isApplied
                  ? applicationStatus === 'Accepted'
                    ? "Hired ✅"
                    : applicationStatus === 'Rejected'
                      ? "Rejected ❌"
                      : "Applied"
                  : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Reduced Height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Job Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h2 className="font-bold text-gray-900">Description</h2>
              </div>
              {/* Compact Scrollable Area */}
              <div className="p-4">
                <div className="h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                    {singleJob?.description || "No description provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Details */}
          <div className="space-y-4">
            {/* Job Details Card */}
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-900 text-sm">Details</h3>
              </div>
              <div className="p-4 space-y-3">
                {/* Role */}
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Role</p>
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {singleJob?.title}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Location</p>
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {singleJob?.location}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.experience} yrs
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Salary</p>
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {singleJob?.salary}
                    </p>
                  </div>
                </div>

                {/* Applicants */}
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-pink-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Applicants</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.applications?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-gray-600 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Posted</p>
                    <p className="text-sm text-gray-900">
                      {singleJob?.createdAt
                        ? new Date(singleJob.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card - Compact */}
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-900 text-sm">Stats</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-lg font-bold text-blue-700">{singleJob?.position || 0}</p>
                    <p className="text-xs text-gray-600">Positions</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="text-lg font-bold text-purple-700">{singleJob?.applications?.length || 0}</p>
                    <p className="text-xs text-gray-600">Applicants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg z-10">
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`w-full text-sm py-2 ${isApplied
                ? applicationStatus === 'Accepted'
                  ? "bg-green-600"
                  : applicationStatus === 'Rejected'
                    ? "bg-red-600"
                    : "bg-gray-600"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
          >
            {isApplied
              ? applicationStatus === 'Accepted'
                ? "Hired ✅"
                : applicationStatus === 'Rejected'
                  ? "Rejected ❌"
                  : "Applied"
              : "Apply Now"}
          </Button>
        </div>
      </div>
      <Footer />
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f8f8;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b0b0b0;
        }
      `}</style>
    </>
  );
};

export default JobDescription;