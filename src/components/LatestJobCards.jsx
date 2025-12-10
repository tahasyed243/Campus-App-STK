import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Calendar, Briefcase, UserCircle } from "lucide-react";

const LatestJobCards = ({ job }) => {
  return (
    <Link to={`/description/${job.id}`}>
      <div className="p-4 sm:p-5 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white hover:border-purple-300 hover:translate-y-[-2px] break-words group">
        {/* Header */}
        <div className="flex flex-col h-full">
          {/* Title and Company Row */}
          <div className="mb-3">
            <div className="flex items-start gap-2">
              <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h2 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 break-words group-hover:text-purple-700 transition-colors">
                  {job.title}
                </h2>
                
                {/* Company with UserCircle Icon */}
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                    <p className="text-sm line-clamp-1 break-words">
                      {job.companyName || "Company"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details - Icons with text */}
          <div className="flex-1 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-1.5 rounded">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {job.location || "Remote"}
                  </p>
                </div>
              </div>

              {/* Job Type */}
              <div className="flex items-center gap-2">
                <div className="bg-green-50 p-1.5 rounded">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {job.jobType || "Full-time"}
                  </p>
                </div>
              </div>

              {/* Salary */}
              {job.salary && (
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-50 p-1.5 rounded">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-sm font-medium text-green-700 truncate">
                      {job.salary}
                    </p>
                  </div>
                </div>
              )}

              {/* Posted Date */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-50 p-1.5 rounded">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Posted</p>
                  <p className="text-sm font-medium text-gray-800">
                    {job.createdAt 
                      ? new Date(job.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      : 'Recently'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Quick Apply Button */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {job.applications?.length || 0} applicants
              </span>
              <button className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCards;