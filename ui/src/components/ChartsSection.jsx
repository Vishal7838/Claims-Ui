import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', claims: 12 },
  { time: '10:00', claims: 19 },
  { time: '12:00', claims: 30 },
  { time: '14:00', claims: 25 },
  { time: '16:00', claims: 40 },
  { time: '18:00', claims: 22 },
  { time: '20:00', claims: 15 },
];

export default function ChartsSection() {
  return (
    <div className="bg-surface p-6 rounded-xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text font-semibold text-gray-900">Claims Trend Over Time</h2>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View Report</button>
      </div>
      <div className="h-64 w-full text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
            <Tooltip 
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="claims" fill="#3730A3" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
