import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClaimsList from './pages/ClaimsList';
import ClaimDetails from './pages/ClaimDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/claims" element={<ClaimsList />} />
      <Route path="/claims/:claimId" element={<ClaimDetails />} />
    </Routes>
  );
}

export default App;
