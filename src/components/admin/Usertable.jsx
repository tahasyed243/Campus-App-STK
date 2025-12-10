import React, { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "@/utils/constant";
import { toast } from "sonner";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'student', 'company', 'admin'
  const [loading, setLoading] = useState(false);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, "users"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map((uid) => ({
          uid,
          ...data[uid],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve or reject user
  const handleUpdateStatus = async (uid, status) => {
    try {
      await update(ref(db, "users/" + uid), { status });
      toast.success(`User ${status}`);
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter users based on selected role
  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((user) => user.role === filter);

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold mb-6 text-center">STK Portal - Users</h1>

      {/* Role filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Role:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="text-center">
                <td className="p-2 border">{user.fullname}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
