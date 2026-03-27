import { Search, Bell, Menu, User } from 'lucide-react';
import { useMsal } from "@azure/msal-react";
import SignOutButton from '../components/SignOutButton';
// import logoImg from '../assets/techxl-log-half.png';

export default function TopAppBar({ onMobileMenuToggle, onDesktopMenuToggle }) {
  const { accounts } = useMsal();
  const userName = accounts[0]?.name || accounts[0]?.username || "User";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMobileMenuToggle} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
        <button onClick={onDesktopMenuToggle} className="hidden lg:block p-2 text-gray-500 hover:text-gray-900 focus:outline-none -ml-2">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <span className="font-semibold text-gray-900">Claim Management</span>
        </div>
      </div>
      
      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2.5 outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900">{userName}</span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Administrator</span>
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
