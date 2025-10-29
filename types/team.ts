// Team collaboration types

export type TeamRole = "owner" | "admin" | "editor" | "viewer";

export type TeamMemberStatus = "active" | "inactive";

export type SharedCaptionStatus =
  | "pending-review"
  | "approved"
  | "needs-changes";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar: string;
  status: TeamMemberStatus;
  joinedDate: string;
  captionsCreated: number;
  lastActive: string;
}

export interface PendingInvite {
  id: string;
  email: string;
  role: TeamRole;
  sentBy: string;
  sentDate: string;
}

export interface SharedCaption {
  id: string;
  text: string;
  createdBy: string;
  createdDate: string;
  status: SharedCaptionStatus;
  comments: number;
  sharedWith: string[];
}

export interface TeamStats {
  totalMembers: number;
  activeThisWeek: number;
  totalCaptions: number;
  pendingInvites: number;
}
