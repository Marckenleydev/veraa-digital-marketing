/* ════════════════════════════════════════════
   CMS CONSTANTS
   Design tokens, mock data, and constants
════════════════════════════════════════════ */

import type { Lead, Client, Project, Content, Result, Service, LeadStatus, ProjectStatus, ContentStatus, Tab } from "./types";



export const T = {
  cream: "#F7F9FC", creamDark: "#E7EDF7",
  ink: "#0F1A4D",   inkSoft: "#1E2C6E",
  amber: "#4FA8F0", amberLight: "#82C6FF",
  sand: "#E5433F",  sandLight: "#F1897F",
};

export const ease = [0.22, 1, 0.36, 1] as const;

/* ── STATUS COLORS ── */
export const STATUS_COLORS: Record<string, string> = {
  New: "#3B82F6",
  Contacted: T.amber,
  Qualified: "#8B5CA5",
  "Proposal Sent": "#2E8B8B",
  Won: "#2e7d4f",
  Lost: "#c0392b",
  Briefing: T.sand,
  "In Progress": T.amber,
  Review: "#8B5CA5",
  Delivered: "#2e7d4f",
  "On Hold": "#c0392b",
  Draft: T.sand,
  Scheduled: "#3B82F6",
  Published: "#2e7d4f",
  Archived: `${T.ink}50`,
};

/* ── SERVICE COLORS ── */
export const SERVICE_COLORS: Record<string, string> = {
  "Web Development": "#4A6FA5",
  "Meta Ads": "#C8872A",
  "Content Production": "#4A8C5C",
};

/* ── ENUMS ── */
export const SERVICES: Service[] = ["Web Development", "Meta Ads", "Content Production"];
export const LEAD_STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];
export const PROJECT_STATUSES: ProjectStatus[] = ["Briefing", "In Progress", "Review", "Delivered", "On Hold"];
export const CONTENT_STATUSES: ContentStatus[] = ["Draft", "Scheduled", "Published", "Archived"];

export const INDUSTRIES = ["Fashion", "F&B", "Real Estate", "Health", "E-Commerce", "SaaS", "Marketing", "Education", "Finance", "Other"];
export const BUDGETS = ["< $1k", "$1k–$2k", "$2k–$5k", "$5k–$15k", "$15k–$50k", "$50k+"];
export const SOURCES = ["Instagram", "LinkedIn", "Referral", "Google", "Cold Outreach", "Event", "Other"];
export const CONTENT_TYPES = ["Reel", "Carousel", "Story", "Static Post", "Short-form Video", "Long-form Video", "Blog Article", "Ad Creative", "Landing Page", "Email"];
export const PLATFORMS = ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "Website", "Email", "Google Ads"];

/* ── METRICS BY SERVICE ── */
export const METRICS: Record<Service, string[]> = {
  "Web Development": ["Conversion Rate", "Page Load Time", "Bounce Rate", "Organic Traffic", "Lighthouse Score", "Revenue", "New Users"],
  "Meta Ads": ["ROAS", "CPM", "CPC", "CTR", "Leads Generated", "Cost Per Lead", "Impressions", "Reach", "Ad Spend", "Revenue"],
  "Content Production": ["Views", "Reach", "Engagement Rate", "Followers Gained", "Saves", "Shares", "Comments", "Link Clicks"],
};

/* ── TABS CONFIG ── */
export const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: "leads", label: "Leads", icon: "◎", desc: "Prospects & pipeline" },
  { id: "clients", label: "Clients", icon: "◈", desc: "Active accounts" },
  { id: "projects", label: "Projects", icon: "⬡", desc: "Work in progress" },
  { id: "content", label: "Content", icon: "◉", desc: "Posts & campaigns" },
  { id: "results", label: "Results", icon: "✦", desc: "Metrics & wins" },
];

/* ── MOCK DATA ── */
export const MOCK_LEADS: Lead[] = [
  {
    _id: "l1",
    name: "Sara Mendes",
    company: "Bloom Studio",
    email: "sara@bloom.io",
    phone: "+971 50 111 2233",
    industry: "Fashion",
    budget: "$5k–$15k",
    source: "Instagram",
    status: "Qualified",
    service: "Web Development",
    notes: "Needs portfolio site + booking system",
    followUp: "2024-07-15",
    createdAt: "2024-07-01",
  },
  {
    _id: "l2",
    name: "Ahmed Al Rashid",
    company: "Dubai Bites",
    email: "ahmed@dubaibites.ae",
    phone: "+971 52 333 4455",
    industry: "F&B",
    budget: "$2k–$5k",
    source: "Referral",
    status: "Contacted",
    service: "Meta Ads",
    notes: "Running IG ads for restaurant chain",
    followUp: "2024-07-18",
    createdAt: "2024-07-05",
  },
  {
    _id: "l3",
    name: "Lena Koch",
    company: "Vibe Agency",
    email: "lena@vibe.de",
    phone: "+49 176 5566 77",
    industry: "Marketing",
    budget: "$15k+",
    source: "LinkedIn",
    status: "Proposal Sent",
    service: "Content Production",
    notes: "Monthly video content package",
    followUp: "2024-07-20",
    createdAt: "2024-07-08",
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    _id: "c1",
    name: "Marcus Webb",
    company: "Nomad OS",
    email: "marcus@nomad.io",
    phone: "+1 415 888 0011",
    industry: "SaaS",
    service: "Web Development",
    contractValue: "$18,000",
    startDate: "2024-06-01",
    notes: "Premium client — monthly retainer",
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    _id: "p1",
    title: "Nomad OS Redesign",
    clientId: "c1",
    clientName: "Nomad OS",
    service: "Web Development",
    status: "In Progress",
    startDate: "2024-06-01",
    deadline: "2024-08-01",
    brief: "Full app redesign + new landing page",
    deliverables: "Figma files, Next.js codebase, CMS integration",
    budget: "$18,000",
    notes: "Weekly demos every Friday",
  },
];

export const MOCK_CONTENT: Content[] = [
  {
    _id: "ct1",
    title: "June Campaign Reel",
    clientId: "c1",
    clientName: "Nomad OS",
    type: "Reel",
    platform: "Instagram",
    service: "Content Production",
    status: "Published",
    scheduledDate: "2024-06-15",
    copy: "Work from anywhere — anytime.",
    mediaUrl: "https://cdn.nomad.io/june-reel.mp4",
    notes: "Best performer — 340k views",
  },
];

export const MOCK_RESULTS: Result[] = [
  {
    _id: "r1",
    projectId: "p1",
    projectTitle: "Nomad OS Redesign",
    clientName: "Nomad OS",
    service: "Web Development",
    metric: "Conversion Rate",
    value: "+68%",
    period: "June 2024",
    notes: "Post-launch vs previous 30 days",
  },
];
