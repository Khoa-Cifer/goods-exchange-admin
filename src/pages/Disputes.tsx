
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DisputeManagement from '@/components/disputes/DisputeManagement';

const Disputes = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DisputeManagement />
      </div>
    </div>
  );
};

export default Disputes;
