import { TeamCollaborationClient } from "@/components/team";
import type { TeamMember, PendingInvite, SharedCaption } from "@/types/team";

// Mock data - Replace with actual data fetching
const getMockTeamData = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "owner",
      avatar: "SJ",
      status: "active",
      joinedDate: "Jan 2024",
      captionsCreated: 127,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Marcus Chen",
      email: "marcus@company.com",
      role: "admin",
      avatar: "MC",
      status: "active",
      joinedDate: "Feb 2024",
      captionsCreated: 89,
      lastActive: "5 hours ago",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily@company.com",
      role: "editor",
      avatar: "ER",
      status: "active",
      joinedDate: "Mar 2024",
      captionsCreated: 45,
      lastActive: "Yesterday",
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james@company.com",
      role: "viewer",
      avatar: "JW",
      status: "inactive",
      joinedDate: "Mar 2024",
      captionsCreated: 12,
      lastActive: "5 days ago",
    },
  ];

  const pendingInvites: PendingInvite[] = [
    {
      id: "1",
      email: "alex@company.com",
      role: "editor",
      sentBy: "Sarah",
      sentDate: "2 days ago",
    },
    {
      id: "2",
      email: "lisa@company.com",
      role: "viewer",
      sentBy: "Marcus",
      sentDate: "1 week ago",
    },
  ];

  const sharedCaptions: SharedCaption[] = [
    {
      id: "1",
      text: "Behind every successful product launch is a team that...",
      createdBy: "Sarah Johnson",
      createdDate: "2 hours ago",
      status: "pending-review",
      comments: 3,
      sharedWith: ["Marcus Chen", "Emily Rodriguez"],
    },
    {
      id: "2",
      text: "Here's what we learned from our biggest campaign failure 👇",
      createdBy: "Marcus Chen",
      createdDate: "1 day ago",
      status: "approved",
      comments: 1,
      sharedWith: ["Sarah Johnson"],
    },
    {
      id: "3",
      text: "Quick win: This strategy 3x'd our engagement in 30 days",
      createdBy: "Emily Rodriguez",
      createdDate: "2 days ago",
      status: "needs-changes",
      comments: 5,
      sharedWith: ["Sarah Johnson", "Marcus Chen"],
    },
  ];

  return { teamMembers, pendingInvites, sharedCaptions };
};

export default function TeamPage() {
  // Server-side data fetching
  const { teamMembers, pendingInvites, sharedCaptions } = getMockTeamData();

  return (
    <TeamCollaborationClient
      teamMembers={teamMembers}
      pendingInvites={pendingInvites}
      sharedCaptions={sharedCaptions}
    />
  );
}
