import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import ChartsSection from '../components/ChartsSection';
import InsightsPanel from '../components/InsightsPanel';
import RecentActivityTable from '../components/RecentActivityTable';
import { insightsData } from '../data/dummyData';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://yajaira-unconcealing-uncorruptedly.ngrok-free.dev';
        const response = await fetch(`${apiUrl}/api/v1/claims`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (!response.ok) throw new Error('Failed to synchronize dashboard data');
        const result = await response.json();
        setClaims(Array.isArray(result) ? result : (result.data || []));
      } catch (err) {
        console.error('Dashboard sync error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Derived Dynamic Data
  const dynamicKpis = [
    { 
      id: 1, 
      title: 'All Claims', 
      value: loading ? '...' : claims.length.toLocaleString(), 
      change: '+12.5%', 
      positive: true 
    },
    { 
      id: 2, 
      title: 'Approved', 
      value: loading ? '...' : claims.filter(c => c.status === 'APPROVED').length.toLocaleString(), 
      change: '+8.2%', 
      positive: true 
    },
    { 
      id: 3, 
      title: 'Rejected/Flagged', 
      value: loading ? '...' : claims.filter(c => c.status === 'REJECTED' || c.status === 'FLAGGED').length.toLocaleString(), 
      change: '-2.4%', 
      positive: false 
    },
    { 
      id: 4, 
      title: 'Pending Review', 
      value: loading ? '...' : claims.filter(c => c.status === 'PENDING' || c.status === 'UNDER REVIEW').length.toLocaleString(), 
      change: '-1.8%', 
      positive: true 
    }
  ];

  const recentActivity = claims.slice(0, 5).map(c => ({
    id: `#${c.id || c.claimId}`,
    provider: c.provider || c.providerName || 'N/A',
    type: c.type || 'Medical',
    status: c.status,
    value: typeof c.amount === 'number' 
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(c.amount)
      : c.amount
  }));
  return (
    <MainLayout>
      <DashboardHeader title="Dashboard Overview" />
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Warning: {error}. Some data may be outdated.</p>
        </div>
      )}

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {dynamicKpis.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ChartsSection />
        <InsightsPanel insights={insightsData} />
      </div>

      {/* Live Recent Activity Table */}
      <div className="mb-6">
        <RecentActivityTable 
          data={recentActivity} 
          isLoading={loading}
        />
        {claims.length === 0 && !loading && !error && (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-sm">
            No recent activity found.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
