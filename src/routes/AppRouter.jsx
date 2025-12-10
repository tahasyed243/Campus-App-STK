import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Applicants from "@/components/company/Applicants";
import CompanyJobs from "@/components/company/CompanyJobs";
import JobUpdate from "@/components/company/Jobupdate";
import PostJob from "@/components/company/PostJob";
import Home from "@/components/Home";
import JobDescription from "@/components/JobDescription";
import Jobs from "@/components/Jobs";
import Profile from "@/components/Profile";
import { HashRouter, Routes, Route } from "react-router-dom";
import Users from "@/components/admin/Users";
import AdminJobs from "@/components/admin/AdminJobs";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "../components/admin/AdminDashboard";
import CompanyDashboard from "../components/company/CompanyDashboard";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/description/:id"
          element={
            <ProtectedRoute>
              <JobDescription />
            </ProtectedRoute>
          }
        />

        {/* Company Routes */}

        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute role="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/jobs"
          element={
            <ProtectedRoute role="company">
              <CompanyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/jobs/:id"
          element={
            <ProtectedRoute role="company">
              <JobUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute role="company">
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/applicants"
          element={
            <ProtectedRoute role="company">
              <Applicants />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute role="admin">
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:jobId/applicants"
          element={
            <ProtectedRoute role="admin">
              <Applicants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
