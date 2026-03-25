import { LayoutDashboard, User, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const bottomNavItems = [
  { name: 'DASHBOARD', path: '/dashboard', icon: LayoutDashboard },
  { name: 'CLAIMS', path: '/claims', icon: List },
  { name: 'PROFILE', path: '/profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-30 flex items-center justify-around px-2 pb-safe">
      {bottomNavItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.name}
            to={item.path}
            className={clsx(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-[#4f46e5]" : "text-gray-400 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
