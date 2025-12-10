import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from './shared/Footer';
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux"; 
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database"; 
import { db } from "@/utils/constant";
import { setAllJobs, setCompanyStatus } from "@/redux/jobSlice"; 

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsAndCompanyStatus = async () => {
      try {
        const jobsRef = ref(db, 'jobs');
        const snapshot = await get(jobsRef);
        if (!snapshot.exists()) return;

        const jobsData = snapshot.val();
        const jobsList = Object.keys(jobsData).map(key => ({ id: key, ...jobsData[key] }));
        dispatch(setAllJobs(jobsList));

        const companyIds = [...new Set(jobsList.map(job => job.companyId).filter(Boolean))];
        const statuses = await Promise.all(companyIds.map(async id => {
          const compSnap = await get(ref(db, `users/${id}/isDeleted`));
          return { id, isDeleted: compSnap.exists() ? compSnap.val() : false };
        }));

        const statusMap = {};
        statuses.forEach(s => statusMap[s.id] = s.isDeleted);
        dispatch(setCompanyStatus(statusMap));

      } catch (err) { console.error(err); }
    };

    fetchJobsAndCompanyStatus();
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-4">
        
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
        >
          ← Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 mt-4">
          Latest & Top <span className="text-purple-700">Jobs</span>
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map(job => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
