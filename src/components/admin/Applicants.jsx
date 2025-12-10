import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { db } from '@/utils/constant';
import { ref, onValue } from 'firebase/database';

const Applicants = () => {
  const {jobId} = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = () => {
      const jobRef = ref(db, `jobs/${jobId.id}`);

      const unsubscribe = onValue(
        jobRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const jobData = snapshot.val();
            dispatch(setAllApplicants(jobData.applications || {}));
          } else {
            console.log("No such job!");
            dispatch(setAllApplicants({}));
          }
        },
        (error) => {
          console.error("Error fetching applicants:", error);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchAllApplicants();

    return () => unsubscribe();
  }, [jobId.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {Object.keys(applicants || {}).length}
        </h1>
        <ApplicantsTable jobId={jobId} />
      </div>
    </div>
  );
};

export default Applicants;
