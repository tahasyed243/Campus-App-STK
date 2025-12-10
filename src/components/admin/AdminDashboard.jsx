import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Ban, Unlock, CheckCircle, XCircle } from "lucide-react";
import { getDatabase, ref, get, update } from "firebase/database";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const usersPerPage = 5;
  const db = getDatabase();

  const fetchUsers = async () => {
    try {
      const snapshot = await get(ref(db, "users/"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setUsers(userList);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Reset page if filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, roleFilter]);

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch = searchText
        ? user.fullname.toLowerCase().includes(searchText.toLowerCase())
        : true;
      const matchesRole = roleFilter === "all" ? true : user.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : "";
        const bVal = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchText, roleFilter, sortConfig]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const approveUser = async (user) => {
    await update(ref(db, `users/${user.id}`), { status: "approved", isDeleted: false });
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "approved" } : u)));
    toast.success("User Approved Successfully!");
  };

  const rejectUser = async (user) => {
    await update(ref(db, `users/${user.id}`), { status: "rejected", isDeleted: true });
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "rejected", isDeleted: true } : u)));
    toast.success("User Rejected Successfully!");
  };

  const toggleBlockUser = async (user) => {
    const isBlocked = user.status === "blocked";
    const newStatus = isBlocked ? "active" : "blocked";
    const newIsDeleted = isBlocked ? false : true;
    await update(ref(db, `users/${user.id}`), { status: newStatus, isDeleted: newIsDeleted });
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus, isDeleted: newIsDeleted } : u))
    );
    toast.success(`User ${newStatus === "blocked" ? "Blocked" : "Unblocked"} Successfully!`);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 pt-8 pl-2">Admin Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center p-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="company">Company</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="p-3">
        <h1 className="font-bold text-xl mb-2">List of Registered Users</h1>
        <Table>
          <TableHeader>
            <TableRow>
              {["fullname", "email", "role", "status"].map((col) => (
                <TableHead
                  key={col}
                  onClick={() => requestSort(col)}
                  className="cursor-pointer select-none"
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </TableHead>
              ))}
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="capitalize">{user.status}</TableCell>
                <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white w-44 flex flex-col gap-2">
                      {user.status !== "approved" && (
                        <div
                          onClick={() => approveUser(user)}
                          className="flex items-center gap-2 cursor-pointer text-green-600 hover:bg-green-700 hover:text-white px-2 py-1 rounded duration-700"
                        >
                          <CheckCircle className="w-4" />
                          <span>Approve</span>
                        </div>
                      )}
                      {user.status !== "rejected" && (
                        <div
                          onClick={() => rejectUser(user)}
                          className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-700 hover:text-white px-2 py-1 rounded duration-700"
                        >
                          <XCircle className="w-4" />
                          <span>Reject</span>
                        </div>
                      )}
                      <div
                        onClick={() => toggleBlockUser(user)}
                        className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-700 hover:text-white px-2 py-1 rounded duration-700"
                      >
                        {user.status === "blocked" ? (
                          <>
                            <Unlock className="w-4" />
                            <span>Unblock</span>
                          </>
                        ) : (
                          <>
                            <Ban className="w-4" />
                            <span>Block</span>
                          </>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-2 mt-4 justify-center items-center flex-wrap">
            <button
              className={`px-3 py-1 rounded-md border transition-colors duration-300 ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-blue-100"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`px-4 py-2 rounded-md font-medium border shadow-sm transition-all duration-300 ${
                  number === currentPage
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              className={`px-3 py-1 rounded-md border transition-colors duration-300 ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-blue-100"
              }`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
