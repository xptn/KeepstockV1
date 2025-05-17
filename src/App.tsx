import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InputProduct from './pages/InputProduct';
import RefillStock from './pages/RefillStock';
import PrintSheets from './pages/PrintSheets';
import BoxManagement from './pages/BoxManagement';
import ActivityLogs from './pages/ActivityLogs';
import { useAuthStore } from './store/authStore';
import NotFound from './pages/NotFound';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Check for system color scheme preference on initial load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="input-product" element={<InputProduct />} />
            <Route path="refill" element={<RefillStock />} />
            <Route path="print-sheets" element={<PrintSheets />} />
            <Route path="box-management" element={<BoxManagement />} />
            <Route path="analytics" element={<div className="p-6">Analytics Page (Coming Soon)</div>} />
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="upload-csv" element={<div className="p-6">Upload CSV Page (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}