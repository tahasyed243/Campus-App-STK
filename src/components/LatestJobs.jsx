import React, { useState } from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs = [], companyStatus = {} } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 3; // changed to 3

  const validJobs = allJobs.filter(job => job?.companyId && !companyStatus[job.companyId]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = validJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(validJobs.length / jobsPerPage);

  return (
    <div className="max-w-7xl mx-auto my-8 sm:my-12 lg:my-16 xl:my-20 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <div className="text-center sm:text-left mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top </span>
          <span className="text-gray-800">Job Openings</span>
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
          Discover your next career opportunity
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {currentJobs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
              No Jobs Available
            </h3>
            <p className="text-gray-500 text-center max-w-md text-sm sm:text-base">
              We're working on bringing new opportunities. Please check back later.
            </p>
          </div>
        ) : (
          currentJobs.map(job => <LatestJobCards key={job.id} job={job} />)
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`px-3 py-1 rounded ${
                number === currentPage
                  ? "bg-[#6A38C2] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
      )}

      {/* View All Button */}
      {validJobs.length > 0 && (
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-[#6A38C2] text-white rounded-lg hover:bg-[#5a2fa3] transition-colors text-sm sm:text-base font-medium"
          >
            View All Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
