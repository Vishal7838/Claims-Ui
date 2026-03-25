import { Filter, Calendar } from 'lucide-react';

export default function DashboardHeader({ title }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex-1 sm:flex-auto justify-center">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>Last 30 Days</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex-1 sm:flex-auto justify-center">
          <Filter className="w-4 h-4 text-gray-500" />
          <span>Filters</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-500 rounded-lg text-sm font-medium hover:bg-primary-100 flex-1 sm:flex-auto justify-center">
          <span>Export Report</span>
        </button>
      </div>  
    </div>
  );
}
