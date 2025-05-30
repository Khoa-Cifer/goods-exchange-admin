
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import UserManagement from '@/components/users/UserManagement';

const Users = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <UserManagement />
      </div>
    </div>
  );
};

export default Users;
