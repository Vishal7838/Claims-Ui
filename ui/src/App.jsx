import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './pages/Dashboard';
import ClaimsList from './pages/ClaimsList';
import Login from './pages/Login';

function App() {
  const { inProgress } = useMsal();

  // Show a loading screen while MSAL is processing the redirect hash or other interactions
  if (inProgress !== "none") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthenticatedTemplate>
      
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
