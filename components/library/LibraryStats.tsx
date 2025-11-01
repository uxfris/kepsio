import React from "react";
import { Card } from "../ui/Card";
import { StatCardSkeleton } from "../ui/Skeleton";
import {
  getPlatformIcon,
  type LibraryStats as Stats,
} from "../../lib/utils/library";

interface LibraryStatsProps {
  stats: Stats;
  isLoading: boolean;
}

export const LibraryStats: React.FC<LibraryStatsProps> = ({
  stats,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </>
    );
  }

  return (
    <>
      <Card
        padding="none"
        className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="p-4">
          <div className="text-sm text-hint mb-1">Total Saved</div>
          <div className="text-2xl font-display font-semibold text-text-head">
            {stats.totalSaved}
          </div>
        </div>
      </Card>

      <Card
        padding="none"
        className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="p-4">
          <div className="text-sm text-hint mb-1">Top Platform</div>
          <div className="flex items-center gap-2 mt-1">
            {getPlatformIcon(stats.topPlatform)}
            <span className="text-lg font-display font-semibold text-text-head capitalize">
              {stats.topPlatform}
            </span>
          </div>
        </div>
      </Card>

      <Card
        padding="none"
        className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="p-4">
          <div className="text-sm text-hint mb-1">Best Style</div>
          <div className="text-lg font-display font-semibold text-text-head">
            {stats.topStyle}
          </div>
        </div>
      </Card>
    </>
  );
};
