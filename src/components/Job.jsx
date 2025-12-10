import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";
import { Loader2, User, MapPin, Clock, DollarSign } from "lucide-react";

const Job = ({ job }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (job?.companyId) {
      const companyRef = ref(db, `companies/${job.companyId}`);
      get(companyRef).then(snapshot => {
        if (snapshot.exists()) setCompany(snapshot.val());
        setLoading(false);
      });
    } else setLoading(false);
  }, [job?.companyId]);

  if (loading) return (
    <div className="flex items-center justify-center p-10 border rounded-xl shadow-md bg-white">
      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
    </div>
  );

  if (company?.isDeleted) return null;

  const daysAgo = timestamp => {
    if (!timestamp) return "Recent";
    const createdAt = new Date(timestamp);
    const diff = new Date() - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    return `${days}d ago`;
  };

  return (
    <div className="p-4 rounded-lg border bg-white hover:border-purple-300 transition cursor-pointer">
      <div className="flex flex-col gap-3">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="text-xs bg-gray-50">
            {daysAgo(job?.createdAt)}
          </Badge>
          <span className="text-xs text-gray-500">{job?.applications?.length || 0} apps</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
          {job?.title}
        </h3>

        {/* Company with Gray User Icon */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-gray-100">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {company?.name || job?.companyName}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{job?.location}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <Clock className="h-3 w-3 text-green-600" />
            <span>{job?.jobType}</span>
          </div>
          {job?.salary && (
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <DollarSign className="h-3 w-3 text-yellow-600" />
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description?.substring(0, 100)}...
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate(`/description/${job?.id}`)}
          className="w-full mt-2 bg-[#6A38C2] hover:bg-[#5a2fa3] text-white text-sm"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default Job;