
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import UserManagement from '@/components/users/UserManagement';
import ListingManagement from '@/components/listings/ListingManagement';
import DisputeManagement from '@/components/disputes/DisputeManagement';
import PlatformSettings from '@/components/settings/PlatformSettings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('users');

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar 
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
      
      <div className="flex-1 overflow-auto">
        {currentPage === 'users' && <UserManagement />}
        {currentPage === 'listings' && <ListingManagement />}
        {currentPage === 'disputes' && <DisputeManagement />}
        {currentPage === 'settings' && <PlatformSettings />}
      </div>
    </div>
  );
};

export default Index;
