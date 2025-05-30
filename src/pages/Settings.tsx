
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PlatformSettings from '@/components/settings/PlatformSettings';

const Settings = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <PlatformSettings />
      </div>
    </div>
  );
};

export default Settings;
