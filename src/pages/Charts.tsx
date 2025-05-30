
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChartsStatistics from '@/components/charts/ChartsStatistics';

const Charts = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ChartsStatistics />
      </div>
    </div>
  );
};

export default Charts;
