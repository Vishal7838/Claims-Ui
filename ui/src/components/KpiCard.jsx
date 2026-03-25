import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

export default function KpiCard({ title, value, change, positive }) {
  return (
    <div className="bg-surface p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <div className={clsx('flex items-center text-sm font-medium', positive ? 'text-green-600' : 'text-red-600')}>
        {positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </div>
    </div>
  );
}
