import { LayoutDashboard, Settings, List, CircleGauge } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import logoImg from '../assets/techxl-logo-full.png';
import logoHalfImg from '../assets/techxl-log-half.png'; 

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Claim List', path: '/claims', icon: List },
  { name: 'Analytics', path: '/analytics', icon: CircleGauge },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onCloseMobile, isDesktopOpen = true }) {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 bg-sidebar text-gray-300 transition-all duration-300 border-r border-gray-800 lg:static",
        // Mobile visibility
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0",
        // Desktop sizing
        isDesktopOpen ? "lg:w-64" : "lg:w-20"
      )}>
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-800 lg:hidden">
          <div className="w-8 h-8  flex items-center justify-center shrink-0">
              <img src={logoImg} alt='logo'/>
          </div>
          <span className="font-semibold text-white truncate">Claim Management</span>
        </div>
        
        {/* Desktop Header Logo when collapsed */}
        <div className="hidden lg:flex h-16 items-center justify-center border-b border-gray-800 shrink-0">
          <div className="flex items-center justify-center shrink-0">
             <img src={isDesktopOpen ? logoImg : logoHalfImg} alt='logo'/>
          </div>
        </div>
        
        <div className={clsx("p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]", !isDesktopOpen && "lg:px-2")}>
          {isDesktopOpen ? (
            <div className="px-2 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider title-text hidden lg:block">Main</div>
          ) : (
             <div className="h-4"></div>
          )}
          
          <div className="px-2 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider lg:hidden">Main</div>
          
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                  isActive 
                    ? "bg-gray-800 text-white" 
                    : "hover:bg-gray-800 hover:text-white",
                  !isDesktopOpen && "lg:justify-center lg:px-0"
                )}
                title={!isDesktopOpen ? item.name : undefined}
                onClick={onCloseMobile}
              >
                <item.icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-primary-500" : "text-gray-400")} />
                <span className={clsx("truncate", !isDesktopOpen && "lg:hidden")}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
