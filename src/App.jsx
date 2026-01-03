import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import Stats from './pages/Stats';
import Measurements from './pages/Measurements';
import Goals from './pages/Goals';
import Calendar from './pages/Calendar';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/measurements" element={<Measurements />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

