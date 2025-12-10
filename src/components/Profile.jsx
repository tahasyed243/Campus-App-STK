import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, ArrowLeft } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* Back Button */}
      <div
        className="flex items-center gap-2 cursor-pointer max-w-4xl mx-auto my-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5 text-gray-700" />
        <span className="text-gray-700 font-medium">Back</span>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills only for students */}
        {user?.role === "student" && (
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1 flex-wrap">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        )}
      </div>

      {user?.role === "student" && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-4">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      )}

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
