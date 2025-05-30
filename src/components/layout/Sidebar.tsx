
import React, { useState } from 'react';
import { Users, ShoppingBag, AlertTriangle, Settings, BarChart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: '/dashboard', label: 'Dashboard', icon: <BarChart className="sidebar-icon" /> },
    { id: '/users', label: 'Users', icon: <Users className="sidebar-icon" /> },
    { id: '/listings', label: 'Listings', icon: <ShoppingBag className="sidebar-icon" /> },
    { id: '/disputes', label: 'Disputes', icon: <AlertTriangle className="sidebar-icon" /> },
    { id: '/charts', label: 'Charts', icon: <BarChart className="sidebar-icon" /> },
    { id: '/settings', label: 'Settings', icon: <Settings className="sidebar-icon" /> },
  ];

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  return (
    <div className={cn(
      "bg-dark-100 transition-all duration-300 flex flex-col", 
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-dark-200 flex items-center justify-between">
        {!collapsed && (
          <div className="text-white font-bold text-xl">GoodEx Admin</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-1 hover:bg-dark-200 rounded-md ml-auto"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePageChange(item.id)}
            className={cn(
              "w-full flex items-center p-3 mb-2 rounded-md transition-colors duration-200",
              location.pathname === item.id 
                ? "bg-primary text-white" 
                : "text-gray-300 hover:bg-dark-200"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-200">
        {!collapsed && (
          <div className="text-sm text-gray-400">
            <div className="font-semibold">Admin User</div>
            <div>admin@goodex.com</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
