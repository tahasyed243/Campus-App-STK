import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import Footer from "../shared/Footer";
import { db } from "@/utils/constant";
import { ref, get } from "firebase/database";

const Applicants = () => {
  const { id, jobId } = useParams();
  const jobID = id || jobId;
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobID) return;

      try {
        const jobRef = ref(db, `jobs/${jobID}`);
        const snapshot = await get(jobRef);

        if (snapshot.exists()) {
          const jobData = snapshot.val();
          const applicationsArray = jobData.applications
            ? Object.keys(jobData.applications).map((key) => ({
                applicantId: key,
                ...jobData.applications[key],
              }))
            : [];

          dispatch(
            setAllApplicants({ ...jobData, applications: applicationsArray })
          );
        } else {
          dispatch(setAllApplicants({ applications: [] }));
          console.log("No applicants found for this job!");
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
        dispatch(setAllApplicants({ applications: [] }));
      }
    };

    fetchApplicants();
  }, [jobID, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mb-41">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length || 0}
        </h1>
        <h1>List Of Applied Applicants</h1>
        <ApplicantsTable jobId={jobID} />
      </div>
      <Footer />
    </div>
  );
};

export default Applicants;
