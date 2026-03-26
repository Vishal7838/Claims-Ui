import React from 'react';
import { useMsal } from "@azure/msal-react";
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
        >
            <LogOut size={18} />
            <span>Sign Out</span>
        </button>
    );
};

export default SignOutButton;
