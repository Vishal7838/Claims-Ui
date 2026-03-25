import { MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

export default function RecentActivityTable({ data }) {
  return (
    <div className="bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden py-2 px-1">
      <div className="px-6 py-5 mb-2 flex justify-between items-center group">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-bold text-indigo-700 hover:text-indigo-800 tracking-wider">VIEW ALL</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-500 font-bold tracking-widest uppercase">
            <tr>
              <th className="px-6 py-4">Claim ID</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 font-medium text-gray-900">{row.id}</td>
                <td className="px-6 py-5 text-gray-600">{row.provider}</td>
                <td className="px-6 py-5 text-gray-600">{row.type}</td>
                <td className="px-6 py-5">
                  <span className={clsx(
                    "px-3 py-1 rounded-md text-xs font-bold tracking-wider",
                    row.status === 'APPROVED' && "bg-emerald-100/60 text-emerald-700",
                    row.status === 'PENDING' && "bg-indigo-100/60 text-indigo-700",
                    row.status === 'REJECTED' && "bg-rose-100/60 text-rose-700"
                  )}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-medium text-gray-900">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
