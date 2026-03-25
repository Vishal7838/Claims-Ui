import MainLayout from '../layouts/MainLayout';
import { Search, Filter, Calendar, Plus, TrendingUp, MoreVertical } from 'lucide-react';
import clsx from 'clsx';

const claimsData = [
  { id: '#CLM-92834', patient: 'Eleanor Shellstrop', provider: 'St. Jude Medical', amount: '$12,450.00', status: 'UNDER REVIEW', aiScore: 84, submitted: 'Oct 24, 2023' },
  { id: '#CLM-92835', patient: 'Chidi Anagonye', provider: 'General Health', amount: '$3,120.50', status: 'APPROVED', aiScore: 52, submitted: 'Oct 23, 2023' },
  { id: '#CLM-92836', patient: 'Tahani Al-Jamil', provider: 'Beverly Hills Ortho', amount: '$45,000.00', status: 'FLAGGED', aiScore: 12, submitted: 'Oct 22, 2023' },
  { id: '#CLM-92837', patient: 'Jason Mendoza', provider: 'FL Medical Group', amount: '$890.00', status: 'PENDING', aiScore: 91, submitted: 'Oct 21, 2023' },
  { id: '#CLM-92838', patient: 'Michael Realman', provider: 'Phoenix Radiology', amount: '$2,400.00', status: 'APPROVED', aiScore: 76, submitted: 'Oct 20, 2023' },
];

export default function ClaimsList() {
  return (
    <MainLayout>
      {/* KPI Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">Total Active Volume</h3>
          <div className="text-3xl font-bold text-[#3730a3] mb-2">1,284</div>
          <div className="flex items-center text-sm font-semibold text-emerald-700">
            <TrendingUp className="w-4 h-4 mr-1.5" />
            12.5% increase from last month
          </div>
        </div>
        
        <div className="bg-[#f8faff] p-5 rounded-xl shadow-sm border border-[#eef2f9]">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">Avg. Processing</h3>
          <div className="text-2xl font-bold text-gray-900">4.2 Days</div>
        </div>
        
        <div className="bg-[#f8faff] p-5 rounded-xl shadow-sm border border-[#eef2f9]">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">High Risk Flag</h3>
          <div className="text-2xl font-bold text-red-600">18</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Claim ID, Patient, or Provider..." 
            className="w-full bg-[#f4f5fa] border-none text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-primary-500 block pl-10 p-3 outline-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <Filter className="w-4 h-4" />
            Status: All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <span className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center text-[10px] text-white font-bold">AI</span>
            AI Score: &gt;50
          </button>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#4f46e5] text-white rounded-lg text-sm font-semibold hover:bg-[#4338ca] transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            New Claim
          </button>
        </div>
      </div>

      {/* List / Table section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-[#f8faff] border-b border-gray-100">
              <tr>
                <th className="pl-6 pr-4 py-5">Claim ID</th>
                <th className="px-4 py-5">Patient Name</th>
                <th className="px-4 py-5">Provider</th>
                <th className="px-4 py-5 font-extrabold text-gray-700 tracking-wider">Amount</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-4 py-5 text-center">AI Score</th>
                <th className="px-4 py-5">Submitted</th>
                <th className="pr-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] tracking-wide">
              {claimsData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="pl-6 pr-4 py-5 font-bold text-[#4f46e5]">{row.id}</td>
                  <td className="px-4 py-5 font-bold text-gray-800">{row.patient}</td>
                  <td className="px-4 py-5 font-medium text-gray-500">{row.provider}</td>
                  <td className="px-4 py-5 font-extrabold text-gray-900">{row.amount}</td>
                  <td className="px-4 py-5">
                    <span className={clsx(
                      "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest",
                      (row.status === 'UNDER REVIEW' || row.status === 'PENDING') && "bg-[#ebf0fc] text-[#6366f1]",
                      row.status === 'APPROVED' && "bg-[#059669] text-white",
                      row.status === 'FLAGGED' && "bg-[#ffe4e6] text-[#e11d48]"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex justify-center">
                      <span className={clsx(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 text-[11px] font-bold",
                        row.aiScore >= 80 && "border-[#34d399] text-[#10b981]",
                        row.aiScore >= 70 && row.aiScore < 80 && "border-[#c7d2fe] text-[#6366f1]",
                        row.aiScore >= 50 && row.aiScore < 70 && "border-[#d8b4fe] text-[#8b5cf6]",
                        row.aiScore < 50 && "border-[#ef4444] text-[#ef4444]"
                      )}>
                        {row.aiScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-medium text-gray-500">{row.submitted}</td>
                  <td className="pr-6 py-5 text-right">
                    <button className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">
                      <MoreVertical className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-gray-500 font-medium tracking-wide">Showing 1 to 5 of 1,284 entries</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 focus:outline-none">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#4f46e5] text-white font-bold text-xs shadow-sm focus:outline-none">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-700 font-bold text-xs hover:bg-gray-50 focus:outline-none">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-700 font-bold text-xs hover:bg-gray-50 focus:outline-none">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 focus:outline-none">&gt;</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
