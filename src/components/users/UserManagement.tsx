import React, { useEffect, useState } from "react";
import { Search, Plus, Edit, Ban, Trash2 } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import http from "@/axios/http";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddModerator = () => {
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

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

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((user) => user.id === userId);

    if (confirm(`Are you sure you want to delete ${userToDelete?.username}?`)) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      toast({
        title: "User deleted",
        description: `${userToDelete?.username} has been deleted from the system`,
        variant: "destructive",
      });
    }
  };

  const saveNewModerator = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      role: "moderator",
      status: "active",
    };

    setUsers([...users, newUser]);
    setShowAddModal(false);

    toast({
      title: "Moderator added",
      description: `${username} has been added as a moderator`,
    });
  };

  const updateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    // Get multiple checked roles
    const roleElements = form.querySelectorAll('input[name="roles"]:checked');
    const roles = Array.from(roleElements).map(
      (el) => (el as HTMLInputElement).value
    );

    const status = (form.elements.namedItem("status") as HTMLSelectElement)
      .value;

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? { ...user, username, email, roles, status }
        : user
    );

    setUsers(updatedUsers);
    setShowEditModal(false);

    toast({
      title: "User updated",
      description: `${username}'s account has been updated`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">User Management</h1>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-60"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="moderator">Moderators</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
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
                        user.is_active === 1
                          ? "status-active"
                          : "status-suspended"
                      )}
                    >
                      {STATUS[user.is_active]}
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
