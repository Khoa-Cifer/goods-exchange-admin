
import React, { useState } from 'react';
import { Users, ShoppingBag, AlertTriangle, Settings, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'users', label: 'Users', icon: <Users className="sidebar-icon" /> },
    { id: 'listings', label: 'Listings', icon: <ShoppingBag className="sidebar-icon" /> },
    { id: 'disputes', label: 'Disputes', icon: <AlertTriangle className="sidebar-icon" /> },
    { id: 'charts', label: 'Charts', icon: <BarChart className="sidebar-icon" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="sidebar-icon" /> },
  ];

  return (
    <div className={cn(
      "fixed top 0 h-screen overflow-y-auto bg-dark-100 transition-all duration-300 flex flex-col",
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
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full flex items-center p-3 mb-2 rounded-md transition-colors duration-200",
              currentPage === item.id
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
          <div className="text-sm text-gray-400 space-y-2">
            <div className="font-semibold text-white">Admin User</div>
            <div className="text-gray-400">admin@goodex.com</div>

            <div className="pt-2 space-y-1">
              <button
                className="w-full text-left text-sm text-white bg-dark-100 hover:bg-dark-200 px-3 py-2 rounded-md transition"
              >
                Chuyển tài khoản
              </button>
              <button
                className="w-full text-left text-sm text-red-500 hover:text-red-600 px-3 py-2 rounded-md transition"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Sidebar;

