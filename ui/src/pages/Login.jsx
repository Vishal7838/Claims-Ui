import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { ShieldCheck, CheckCircle, FileSearch, Lock } from 'lucide-react';

const Login = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0a0c10] overflow-hidden font-sans">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
                
                {/* Floating Validation Symbols */}
                <div className="absolute top-20 left-[15%] text-blue-500/20 animate-pulse">
                    <ShieldCheck size={80} strokeWidth={1} />
                </div>
                <div className="absolute bottom-40 left-[10%] text-emerald-500/20 animate-bounce transition-all duration-3000">
                    <CheckCircle size={60} strokeWidth={1} />
                </div>
                <div className="absolute top-40 right-[15%] text-indigo-500/20 animate-pulse delay-700">
                    <FileSearch size={100} strokeWidth={1} />
                </div>
                <div className="absolute bottom-20 right-[20%] text-blue-400/20 animate-bounce delay-1000">
                    <Lock size={50} strokeWidth={1} />
                </div>
            </div>

            <div className="relative z-10 max-w-md w-full px-6 py-12 mx-4 group">
                <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10 transform transition-all duration-500 hover:scale-[1.01] hover:border-blue-500/30">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                            <ShieldCheck className="text-white w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                            Claims Validation System
                        </h2>
                        <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
                            Sign in to your corporate account to manage and validate medical claims.
                        </p>
                    </div>

                    <div className="mt-10 space-y-6">
                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-[#5e5e5e] font-semibold text-sm rounded-md border border-gray-300 hover:bg-gray-50 hover:shadow-lg hover:border-gray-400 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        >
                            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                                <div className="bg-[#f25022] w-2 h-2"></div>
                                <div className="bg-[#7fbb00] w-2 h-2"></div>
                                <div className="bg-[#00a4ef] w-2 h-2"></div>
                                <div className="bg-[#ffb900] w-2 h-2"></div>
                            </div>
                            Sign in with Microsoft
                        </button>
                        
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-white/5"></div>
                            <span className="flex-shrink mx-4 text-[10px] text-gray-500 font-bold uppercase tracking-[2px]">Enterprise SSO</span>
                            <div className="flex-grow border-t border-white/5"></div>
                        </div>

                        <p className="text-center text-[11px] text-gray-500">
                            By signing in, you agree to our <a href="#" className="hover:text-blue-400 underline underline-offset-4">Terms of Service</a> and <a href="#" className="hover:text-blue-400 underline underline-offset-4">Privacy Policy</a>
                        </p>
                    </div>
                </div>
                
                {/* Subtle footer */}
                <p className="mt-8 text-center text-xs text-gray-600 font-medium">
                    &copy; 2026 Techxl. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
