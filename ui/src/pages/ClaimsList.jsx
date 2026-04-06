import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Search, Filter, Calendar, Plus, TrendingUp, MoreVertical, Loader2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/claims`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'allow-origin':'*'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch claims from server');
        const result = await response.json();
        setClaims(Array.isArray(result) ? result : (result.data || []));
      } catch (err) {
        console.error('Error fetching claims:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const totalPages = Math.ceil(claims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClaims = claims.slice(startIndex, startIndex + itemsPerPage);
  return (
    <MainLayout>
      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">Total Active Volume</h3>
          <div className="text-3xl font-bold text-[#3730a3] mb-2">{loading ? "..." : claims.length.toLocaleString()}</div>
          <div className="flex items-center text-sm font-semibold text-emerald-700">
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Live sync from API
          </div>
        </div>
        
        <div className="bg-[#f8faff] p-5 rounded-xl shadow-sm border border-[#eef2f9]">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">Avg. Processing</h3>
          <div className="text-2xl font-bold text-gray-900">4.2 Days</div>
        </div>
        
        <div className="bg-[#f8faff] p-5 rounded-xl shadow-sm border border-[#eef2f9]">
          <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">High Risk Flag</h3>
          <div className="text-2xl font-bold text-red-600">
            {loading ? "..." : claims.filter(c => c.status === 'FLAGGED').length}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Claim ID, Patient, or Provider..." 
            className="w-full bg-[#f4f5fa] border-none text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-primary-500 block pl-10 p-3 outline-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <Filter className="w-4 h-4" />
            Status: All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <span className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center text-[10px] text-white font-bold">AI</span>
            AI Score: &gt;50
          </button>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#f4f5fa] rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#4f46e5] text-white rounded-lg text-sm font-semibold hover:bg-[#4338ca] transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            New Claim
          </button>
        </div>
      </div>

      {/* List / Table section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-[#f8faff] border-b border-gray-100">
              <tr>
                <th className="pl-6 pr-4 py-5">Claim ID</th>
                <th className="px-4 py-5">Patient Name</th>
                <th className="px-4 py-5">Provider</th>
                <th className="px-4 py-5 font-extrabold text-gray-700 tracking-wider">Amount</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-4 py-5 text-center">AI Score</th>
                <th className="px-4 py-5">Submitted</th>
                <th className="pr-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] tracking-wide">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-10 h-10 animate-spin text-[#4f46e5]" />
                      <p className="font-semibold text-gray-600">Retrieving Claims...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-red-500">
                      <AlertCircle className="w-10 h-10" />
                      <p className="font-semibold underline underline-offset-4">{error}</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-5 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all border border-red-200"
                      >
                        Retry Connection
                      </button>
                    </div>
                  </td>
                </tr>
              ) : claims.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                    No active claims found in the system.
                  </td>
                </tr>
              ) : (
                paginatedClaims.map((row) => (
                  <tr key={row.id || row.ClaimID} className="hover:bg-gray-50 transition-colors group">
                    <td className="pl-6 pr-4 py-5 font-bold">
                      <Link
                        to={`/claims/${encodeURIComponent(row.id || row.ClaimID)}`}
                        className="text-[#4f46e5] hover:underline underline-offset-4"
                      >
                        #{row.id || row.ClaimID}
                      </Link>
                    </td>
                    <td className="px-4 py-5 font-bold text-gray-800">{row.Patient || row.patientName}</td>
                    <td className="px-4 py-5 font-medium text-gray-500">{row.Provider || row.provider}</td>
                    <td className="px-4 py-5 font-extrabold text-gray-900">
                      {typeof row.ClaimAmount === 'number' 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.ClaimAmount)
                        : row.ClaimAmount
                      }
                    </td>
                    <td className="px-4 py-5">
                      <span className={clsx(
                        "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest",
                        (row.ClaimStatus === 'UNDER REVIEW' || row.ClaimStatus === 'PENDING') && "bg-[#ebf0fc] text-[#6366f1]",
                        row.ClaimStatus === 'APPROVED' && "bg-[#059669] text-white",
                        row.ClaimStatus === 'FLAGGED' && "bg-[#ffe4e6] text-[#e11d48]"
                      )}>
                        {row.ClaimStatus}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex justify-center">
                        <span className={clsx(
                          "flex items-center justify-center w-8 h-8 rounded-full border-2 text-[11px] font-bold",
                          (row.reviewScore || row.reviewScore) >= 80 && "border-[#34d399] text-[#10b981]",
                          (row.reviewScore || row.reviewScore) >= 70 && (row.reviewScore || row.reviewScore) < 80 && "border-[#c7d2fe] text-[#6366f1]",
                          (row.reviewScore || row.reviewScore) >= 50 && (row.reviewScore || row.reviewScore) < 70 && "border-[#d8b4fe] text-[#8b5cf6]",
                          (row.reviewScore || row.reviewScore) < 50 && "border-[#ef4444] text-[#ef4444]"
                        )}>
                          {row.reviewScore || row.reviewScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-medium text-gray-500">{formatDate(row.submittedAt || row.date)}</td>
                    <td className="pr-6 py-5 text-right">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">
                        <MoreVertical className="w-5 h-5 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination synchronized with state */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-gray-500 font-medium tracking-wide font-sans">
            Showing {claims.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, claims.length)} of {claims.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              &lt;
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  "w-8 h-8 flex items-center justify-center rounded font-bold text-xs transition-all focus:outline-none",
                  currentPage === page 
                    ? "bg-[#4f46e5] text-white shadow-md transform scale-110" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || loading || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
