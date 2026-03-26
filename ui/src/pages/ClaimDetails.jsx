import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import clsx from "clsx";
import {
  ArrowLeft,
  Ban,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Flag,
  Hospital,
  Image as ImageIcon,
  MapPinOff,
  PlusCircle,
  Sparkles,
  TriangleAlert,
  User,
} from "lucide-react";
import { getClaimById } from "../data/claims";

function clamp01(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function RiskRing({ value = 0, className }) {
  const pct = clamp01(Number(value) / 100);
  const r = 40;
  const c = 2 * Math.PI * r; // circumference
  const dashOffset = c * (1 - pct);
  return (
    <div className={clsx("relative w-24 h-24", className)}>
      <svg className="w-full h-full -rotate-90">
        <circle
          className="text-surface-variant"
          cx="48"
          cy="48"
          r={r}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className="text-primary-600"
          cx="48"
          cy="48"
          r={r}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={c}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-on-surface">{Math.round(pct * 100)}%</span>
        <span className="text-[0.6rem] uppercase font-bold text-on-surface-variant">Risk</span>
      </div>
    </div>
  );
}

export default function ClaimDetails() {
  const { claimId } = useParams();
  const claim = useMemo(() => getClaimById(claimId), [claimId]);

  const [patientOpen, setPatientOpen] = useState(true);
  const [providerOpen, setProviderOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(true);

  const statusLabel = claim?.status
    ? claim.status === "UNDER REVIEW"
      ? "Pending Review"
      : claim.status
    : "Pending Review";

  const totalAmount = claim?.amount ?? "$4,850.00";
  const riskScore = claim?.aiScore ?? 84;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto w-full py-4 md:py-6">
        {/* Back link */}
        <nav className="mb-6">
          <Link
            to="/claims"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Claims List
          </Link>
        </nav>

        {/* Header */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                {claim?.id ?? "CLM-99284-X"}
              </h2>
              <span className="bg-surface-container-high text-on-secondary-container px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                {statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-8 mt-4">
              <div className="flex flex-col">
                <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-on-surface">{totalAmount}</span>
              </div>
              <div className="h-10 w-px bg-outline-variant/30" />
              <div className="flex flex-col">
                <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">
                  Risk Score
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-error">{riskScore}</span>
                  <span className="text-sm font-medium text-on-surface-variant">/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-variant transition-colors inline-flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Flag
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-error-container text-on-error-container font-semibold text-sm hover:opacity-90 transition-colors inline-flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Reject
            </button>
            <button className="px-8 py-2.5 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 text-white font-bold text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 fill-white" />
              Approve
            </button>
          </div>
        </section>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-8 space-y-6">
            {/* AI Review */}
            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-16 h-16" />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-on-surface">AI Review Analysis</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    The automated review engine has flagged this claim for high-intensity coding relative to the
                    diagnosis. Cross-referencing provider history shows a 12% deviation from peer average for similar
                    outpatient procedures.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-error-container/30 text-error rounded-lg text-xs font-bold border border-error/10">
                      <TriangleAlert className="w-4 h-4" />
                      UPCODING SUSPECTED
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-bold">
                      <MapPinOff className="w-4 h-4" />
                      OUT-OF-NETWORK PROVIDER
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col items-center justify-center border border-primary-500/5">
                  <RiskRing value={riskScore} className="mb-3" />
                  <span className="text-[0.7rem] font-bold text-on-surface-variant">
                    Confidence: <span className="text-primary-600">92.4%</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className="w-full p-6 flex items-center justify-between border-b border-surface-container text-left"
              >
                <h3 className="text-[15px] font-bold text-on-surface">Service Breakdown &amp; Costs</h3>
                {servicesOpen ? (
                  <ChevronUp className="w-5 h-5 text-on-surface-variant" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                )}
              </button>

              {servicesOpen && (
                <div className="p-0">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low">
                      <tr>
                        <th className="px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">
                          Code
                        </th>
                        <th className="px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">
                          Description
                        </th>
                        <th className="px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60 text-right">
                          Qty
                        </th>
                        <th className="px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant opacity-60 text-right">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      <tr className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-primary-600">99214</td>
                        <td className="px-6 py-4 text-sm text-on-surface">Office Outpatient Visit (Level 4)</td>
                        <td className="px-6 py-4 text-sm text-on-surface text-right">1</td>
                        <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">$320.00</td>
                      </tr>
                      <tr className="bg-surface-container-low/20">
                        <td className="px-6 py-4 text-sm font-semibold text-primary-600">70553</td>
                        <td className="px-6 py-4 text-sm text-on-surface">MRI Brain w/o &amp; w/ Contrast</td>
                        <td className="px-6 py-4 text-sm text-on-surface text-right">1</td>
                        <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">$4,100.00</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-primary-600">96372</td>
                        <td className="px-6 py-4 text-sm text-on-surface">Therapeutic Injection</td>
                        <td className="px-6 py-4 text-sm text-on-surface text-right">3</td>
                        <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">$430.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Uploaded documents */}
            <div>
              <h3 className="text-[15px] font-bold text-on-surface mb-4 px-1">Uploaded Documents</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group relative bg-white rounded-xl p-3 shadow-sm border border-surface-container hover:border-primary-500/30 transition-all cursor-pointer">
                  <div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                    <FileText className="w-10 h-10 text-on-surface-variant/40" />
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate block">medical_record_v1.pdf</span>
                  <span className="text-[0.6rem] text-on-surface-variant">2.4 MB • PDF</span>
                </div>

                <div className="group relative bg-white rounded-xl p-3 shadow-sm border border-surface-container hover:border-primary-500/30 transition-all cursor-pointer">
                  <div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="MRI scan"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY2Qe2TCDTMv2QCiu0jJQzy3cN5jYO40z0Z0ndRuZv-viuzwanzn1Ya14wCWMXapITZiqk79sq5r9VwFXW0BHBFMjGN1PU4yaL6CmWa7Q6R4wf2_hmpLyNxFUqShwxITo4Te-2QxPMyN_044NQbW6X0aXP7QkGHy34V1JkqpqMGPmu-s8h_Md8R3dtwjJ9BNnaFj9UPLiDQcD3PhXATA2Jr2YOMZ2yvU_EHkXY2wD-Rk4AkpXBQK5n2tEZ87KY3zw3iqhghYSLN8eh"
                    />
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate block">mri_scan_axial.jpg</span>
                  <span className="text-[0.6rem] text-on-surface-variant">15.8 MB • JPG</span>
                </div>

                <div className="group relative bg-white rounded-xl p-3 shadow-sm border border-surface-container hover:border-primary-500/30 transition-all cursor-pointer">
                  <div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                    <ImageIcon className="w-10 h-10 text-on-surface-variant/40" />
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate block">lab_results_page1.png</span>
                  <span className="text-[0.6rem] text-on-surface-variant">4.1 MB • PNG</span>
                </div>

                <div className="group relative bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl p-3 flex flex-col items-center justify-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <PlusCircle className="w-5 h-5 text-primary-600" />
                  <span className="text-[0.6rem] font-bold text-primary-600 uppercase">Add File</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 space-y-6">
            {/* Patient & Provider */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden divide-y divide-surface-container">
              {/* Patient */}
              <div className="p-5">
                <button
                  type="button"
                  onClick={() => setPatientOpen((v) => !v)}
                  className="w-full flex items-center justify-between mb-4 text-left"
                >
                  <h4 className="text-sm font-bold text-on-surface inline-flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    Patient Details
                  </h4>
                  {patientOpen ? (
                    <ChevronUp className="w-4 h-4 text-on-surface-variant" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                  )}
                </button>

                {patientOpen && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-[0.6rem] uppercase font-bold text-on-surface-variant opacity-60">
                        Full Name
                      </span>
                      <p className="text-sm font-semibold text-on-surface">{claim?.patient ?? "Sarah J. Montgomery"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[0.6rem] uppercase font-bold text-on-surface-variant opacity-60">DOB</span>
                        <p className="text-sm font-semibold text-on-surface">04/12/1982</p>
                      </div>
                      <div>
                        <span className="text-[0.6rem] uppercase font-bold text-on-surface-variant opacity-60">
                          ID Number
                        </span>
                        <p className="text-sm font-semibold text-on-surface">GRP-44029-S</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Provider */}
              <div className="p-5">
                <button
                  type="button"
                  onClick={() => setProviderOpen((v) => !v)}
                  className="w-full flex items-center justify-between mb-4 text-left"
                >
                  <h4 className="text-sm font-bold text-on-surface inline-flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-primary-600" />
                    Provider Details
                  </h4>
                  {providerOpen ? (
                    <ChevronUp className="w-4 h-4 text-on-surface-variant" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                  )}
                </button>

                {providerOpen && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-on-surface">{claim?.provider ?? "St. Jude Medical Center"}</p>
                    <p className="text-xs text-on-surface-variant">1200 Healthcare Plaza, Suite 400</p>
                    <p className="text-xs text-on-surface-variant">NPI: 1029384756</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lifecycle */}
            <div className="bg-surface-container-low rounded-xl p-6">
              <h3 className="text-[15px] font-bold text-on-surface mb-6">Claim Lifecycle</h3>
              <div className="relative space-y-8">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-outline-variant/30" />

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,83,56,0.4)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-bold text-on-surface">Submitted</p>
                  <p className="text-[0.65rem] text-on-surface-variant">Oct 24, 2023 • 09:12 AM</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,83,56,0.4)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-bold text-on-surface">Pre-Validation Success</p>
                  <p className="text-[0.65rem] text-on-surface-variant">Oct 24, 2023 • 09:14 AM</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,83,56,0.4)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-bold text-on-surface">AI Review Completed</p>
                  <p className="text-[0.65rem] text-on-surface-variant">Oct 24, 2023 • 09:15 AM</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary-600 animate-pulse flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <p className="text-xs font-bold text-primary-600">Final Adjudication</p>
                  <p className="text-[0.65rem] text-on-surface-variant">In Progress...</p>
                </div>
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="bg-surface-container-highest/40 rounded-xl p-5 border border-primary-500/10">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Reviewer Notes</h3>
              <textarea
                className="w-full bg-surface-container-lowest border-0 rounded-lg text-sm p-3 focus:ring-2 focus:ring-primary-500/20 placeholder:text-on-surface-variant/40 min-h-[120px]"
                placeholder="Add a private note for the adjudication team..."
              />
              <div className="flex justify-end mt-2">
                <button className="text-xs font-bold text-primary-600 hover:underline">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

