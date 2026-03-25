import MainLayout from '../layouts/MainLayout';
import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import ChartsSection from '../components/ChartsSection';
import InsightsPanel from '../components/InsightsPanel';
import RecentActivityTable from '../components/RecentActivityTable';
import { kpiMetrics, recentActivityRows, insightsData } from '../data/dummyData';

export default function Dashboard() {
  return (
    <MainLayout>
      <DashboardHeader title="Dashboard Overview" />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiMetrics.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ChartsSection />
        <InsightsPanel insights={insightsData} />
      </div>

      {/* Bottom Table */}
      <div className="mb-6">
        <RecentActivityTable data={recentActivityRows} />
      </div>
    </MainLayout>
  );
}
