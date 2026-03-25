import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const statusData = [
  { name: 'Approved', value: 66, color: '#3730a3' }, // Indigo robust
  { name: 'Rejected', value: 11, color: '#4ade80' }, // Greenish
  { name: 'Pending', value: 23, color: '#e0e7ff' }, // Light blue ghost
];

export default function InsightsPanel() {
  return (
    <div className="bg-surface p-6 rounded-xl border border-gray-100 shadow-sm col-span-1 flex flex-col items-center overflow-hidden">
      <div className="w-full text-left mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Status Distribution</h2>
      </div>
      
      {/* Chart Area */}
      <div className="relative w-48 h-48 mb-8">
        {/* Subtle background container like the image */}
        <div className="absolute inset-0 bg-[#f4f5fa] rounded-2xl -m-6 z-0"></div>
        
        <div className="relative z-10 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-2xl font-bold text-gray-900">1.2k</span>
          <span className="text-[10px] font-bold text-gray-500 tracking-wider">TOTAL</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full space-y-4 mt-6">
        {statusData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm px-2">
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              {item.name}
            </div>
            <span className="font-bold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
