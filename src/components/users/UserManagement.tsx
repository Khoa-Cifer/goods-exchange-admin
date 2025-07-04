import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import http from "@/utils/http";
import { ROLES } from "@/enum/role";
import { STATUS } from "@/enum/active-status";

interface User {
  id: string;
  username: string;
  email: string;
  role: string[];
  status: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  const getAllUsers = async () => {
    const response = await http.get("/users/all-users");
    const data = await response.data.result;
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSuspendUser = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "active" ? "suspended" : "active" }
        : user
    );
    setUsers(updatedUsers);

    const user = users.find((u) => u.id === userId);
    const newStatus = user?.status === "active" ? "suspended" : "active";

    toast({
      title: `User ${newStatus}`,
      description: `${user?.username} has been ${newStatus}`,
      variant: newStatus === "active" ? "default" : "destructive",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">User Management</h1>
      </div>

      <div className="bg-dark-100 rounded-lg shadow-md overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-200">
          <thead className="bg-dark-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-dark-200/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {Array.isArray(user.userRoles)
                      ? user.userRoles.map(role => ROLES[role.roleId] || `Unknown(${role.roleId})`).join(", ")
                      : ROLES[user.userRoles.roleId] || `Unknown(${user.userRoles.roleId})`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "status-badge",
                        user.isActive === 1
                          ? "status-active"
                          : "status-suspended"
                      )}
                    >
                      {STATUS[user.isActive]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  No users found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
