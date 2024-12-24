import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManageBuses from './pages/ManageBuses';
import UserHistory from './pages/UserHistory';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';
import './styles/admin.css';

const App = () => {
  return (
    <Router>
      <div className="admin-panel flex">
        <Sidebar />
        <div className="content w-full p-4">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/manage-buses" element={<ManageBuses />} />
            <Route path="/user-history" element={<UserHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;