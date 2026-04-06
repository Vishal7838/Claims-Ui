import { MoreHorizontal, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function RecentActivityTable({ data = [], isLoading = false }) {
  return (
    <div className="bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden py-2 px-1">
      <div className="px-6 py-5 mb-2 flex justify-between items-center group">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Recent Activity</h2>
        <Link 
          to="/claims" 
          className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 tracking-widest uppercase transition-colors"
        >
          VIEW ALL CLAIMS
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-[10px] text-gray-400 font-bold tracking-widest uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-4">Claim ID</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className={clsx("divide-y divide-gray-50", isLoading && "opacity-50")}>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Syncing Activity...</span>
                  </div>
                </td>
              </tr>
            ) : data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 font-bold text-gray-900 group">
                  <span className="text-indigo-100 mr-2 group-hover:text-indigo-200 transition-colors">/</span>
                  {row.id}
                </td>
                <td className="px-6 py-5 text-[13px] font-medium text-gray-600">{row.provider}</td>
                <td className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{row.type}</td>
                <td className="px-6 py-5">
                  <span className={clsx(
                    "px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider border",
                    (row.status === 'APPROVED') && "bg-emerald-50 text-emerald-700 border-emerald-100",
                    (row.status === 'PENDING' || row.status === 'UNDER REVIEW') && "bg-indigo-50 text-indigo-700 border-indigo-100",
                    (row.status === 'REJECTED' || row.status === 'FLAGGED') && "bg-rose-50 text-rose-700 border-rose-100"
                  )}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-extrabold text-gray-900 font-mono tracking-tight">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
