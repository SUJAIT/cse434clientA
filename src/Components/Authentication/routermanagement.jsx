import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Spinner from './components/Spinner';
import PrivateRoute from './utils/PrivateRoute';
import RoleBasedRoute from './utils/RoleBasedRoute';

// Lazy loading components for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ManageBuses = lazy(() => import('./pages/ManageBuses'));
const ManageUsers = lazy(() => import('./pages/ManageUsers'));
const BookingHistory = lazy(() => import('./pages/BookingHistory'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouterManagement = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Common Navbar */}
        <Navbar />

        <div className="flex flex-grow">
          {/* Sidebar for navigation */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-grow p-4">
            <Suspense fallback={<Spinner />}>
              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/manage-buses"
                    element={<RoleBasedRoute allowedRoles={['admin']} component={<ManageBuses />} />}
                  />
                  <Route
                    path="/manage-users"
                    element={<RoleBasedRoute allowedRoles={['admin']} component={<ManageUsers />} />}
                  />
                  <Route
                    path="/booking-history"
                    element={<RoleBasedRoute allowedRoles={['admin', 'user']} component={<BookingHistory />} />}
                  />
                </Route>

                {/* Catch-All Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default RouterManagement;