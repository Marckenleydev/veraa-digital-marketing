/* ════════════════════════════════════════════
   types/index.ts
   All TypeScript interfaces and union types
   used across the CMS. Import from here only.
════════════════════════════════════════════ */

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type ProjectStatus =
  | "Briefing"
  | "In Progress"
  | "Review"
  | "Delivered"
  | "On Hold";

export type ContentStatus =
  | "Draft"
  | "Scheduled"
  | "Published"
  | "Archived";

export type Service =
  | "Web Development"
  | "Meta Ads"
  | "Content Production";

export type Tab =
  | "leads"
  | "clients"
  | "projects"
  | "content"
  | "results";

/* ── Entity interfaces ── */

export interface Lead {
  _id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  budget: string;
  source: string;
  status: LeadStatus;
  notes: string;
  followUp: string;
  service: Service;
  createdAt?: string;
}

export interface Client {
  _id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  service: Service;
  contractValue: string;
  startDate: string;
  notes: string;
  leadId?: string;
}

export interface Project {
  _id?: string;
  title: string;
  clientId: string;
  clientName: string;
  service: Service;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  brief: string;
  deliverables: string;
  budget: string;
  notes: string;
}

export interface Content {
  _id?: string;
  title: string;
  clientId: string;
  clientName: string;
  type: string;
  platform: string;
  service: Service;
  status: ContentStatus;
  scheduledDate: string;
  copy: string;
  mediaUrl: string;
  notes: string;
}

export interface Result {
  _id?: string;
  projectId: string;
  projectTitle: string;
  clientName: string;
  service: Service;
  metric: string;
  value: string;
  period: string;
  notes: string;
}