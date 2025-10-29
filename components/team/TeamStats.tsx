import { Card } from "../ui/Card";
import type { TeamStats as TeamStatsType } from "@/types/team";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const statItems = [
    {
      label: "Total Members",
      value: stats.totalMembers,
    },
    {
      label: "Active This Week",
      value: stats.activeThisWeek,
    },
    {
      label: "Total Captions",
      value: stats.totalCaptions,
    },
    {
      label: "Pending Invites",
      value: stats.pendingInvites,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat) => (
        <Card key={stat.label} padding="md">
          <p className="text-2xl font-bold text-primary">{stat.value}</p>
          <p className="text-sm text-text-body">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
