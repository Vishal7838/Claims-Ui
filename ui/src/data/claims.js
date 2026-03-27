export const claims = [
  {
    id: "CLM-92834",
    patient: "Eleanor Shellstrop",
    provider: "St. Jude Medical",
    amount: "$12,450.00",
    status: "UNDER REVIEW",
    aiScore: 84,
    submitted: "Oct 24, 2023",
  },
  {
    id: "CLM-92835",
    patient: "Chidi Anagonye",
    provider: "General Health",
    amount: "$3,120.50",
    status: "APPROVED",
    aiScore: 52,
    submitted: "Oct 23, 2023",
  },
  {
    id: "CLM-92836",
    patient: "Tahani Al-Jamil",
    provider: "Beverly Hills Ortho",
    amount: "$45,000.00",
    status: "FLAGGED",
    aiScore: 12,
    submitted: "Oct 22, 2023",
  },
  {
    id: "CLM-92837",
    patient: "Jason Mendoza",
    provider: "FL Medical Group",
    amount: "$890.00",
    status: "PENDING",
    aiScore: 91,
    submitted: "Oct 21, 2023",
  },
  {
    id: "CLM-92838",
    patient: "Michael Realman",
    provider: "Phoenix Radiology",
    amount: "$2,400.00",
    status: "APPROVED",
    aiScore: 76,
    submitted: "Oct 20, 2023",
  },
];

export function getClaimById(claimId) {
  const normalized = String(claimId || "").replace(/^#/, "").trim();
  return claims.find((c) => c.id === normalized) || null;
}

