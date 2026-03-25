import { useState } from 'react';
import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';
import BottomNav from './BottomNav';

export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans text-gray-900">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isDesktopOpen={isDesktopSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopAppBar 
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)} 
          onDesktopMenuToggle={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-20 md:pb-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
