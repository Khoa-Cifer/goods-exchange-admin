
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ListingManagement from '@/components/listings/ListingManagement';

const Listings = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ListingManagement />
      </div>
    </div>
  );
};

export default Listings;
