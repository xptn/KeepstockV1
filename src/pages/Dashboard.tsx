import React from 'react';
import DashboardStats from '../components/Dashboard/DashboardStats';
import ActivityChart from '../components/Dashboard/ActivityChart';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {user?.role === 'store' 
              ? `Overview of ${user.branch} inventory management`
              : 'Overview of all branches inventory management'}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <DashboardStats />
      
      <ActivityChart />
    </div>
  );
};

export default Dashboard;