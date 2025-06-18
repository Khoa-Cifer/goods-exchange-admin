
import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit, Ban, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import http from '@/axios/http';
import { User } from '@/types/user';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    const data = await response.data;
    setUsers(data);
    console.log(data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSuspendUser = (userId: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: user.is_active === 1 ? 'suspended' : 'active' } : user
    );
    setUsers(updatedUsers);

    const user = users.find(u => u.id === userId);
    const newStatus = user?.is_active === 1 ? 'suspended' : 'active';

    toast({
      title: `User ${newStatus}`,
      description: `${user?.username} has been ${newStatus}`,
      variant: newStatus === 'active' ? 'default' : 'destructive',
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);

    if (confirm(`Are you sure you want to delete ${userToDelete?.username}?`)) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);

      toast({
        title: "User deleted",
        description: `${userToDelete?.username} has been deleted from the system`,
        variant: "destructive",
      });
    }
  };

  const updateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;

    const updatedUsers = users.map(user =>
      user.id === currentUser.id ? { ...user, username, email, role } : user
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-60"
            />
          </div>

          <button
            onClick={handleAddModerator}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Moderator
          </button>
        </div>
      </div>

      <div className="bg-dark-100 rounded-lg shadow-md overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-200">
          <thead className="bg-dark-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200">
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} className="hover:bg-dark-200/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "status-badge",
                      user.is_active === 1 ? "status-active" : "status-suspended"
                    )}>
                      {user.is_active}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-white"
                        title="Edit User"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-red-500"
                        title={user.status === 'active' ? "Suspend User" : "Activate User"}
                      >
                        <Ban size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-red-500"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

      {/* Edit User Modal */}
      {showEditModal && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={updateUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={currentUser.username}
                  required
                  className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={currentUser.email}
                  required
                  className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  defaultValue={currentUser.role}
                  className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
