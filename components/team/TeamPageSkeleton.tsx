export function TeamPageSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-surface border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-section rounded" />
              <div className="h-8 w-48 bg-section rounded" />
              <div className="h-6 w-16 bg-section rounded" />
            </div>
            <div className="h-5 w-96 bg-section rounded" />
          </div>
          <div className="h-10 w-48 bg-section rounded-lg" />
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-1 border-b border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-4 py-2.5">
              <div className="h-5 w-32 bg-section rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-8">
        {/* Search and Filter Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 max-w-md h-10 bg-surface border border-border rounded-lg" />
          <div className="h-10 w-24 bg-surface border border-border rounded-lg" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-surface rounded-lg border border-border p-4"
            >
              <div className="h-8 w-16 bg-section rounded mb-2" />
              <div className="h-4 w-24 bg-section rounded" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="bg-section border-b border-border p-4">
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex-1 h-4 bg-border rounded" />
              ))}
            </div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 border-b border-border last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-section rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-section rounded" />
                  <div className="h-3 w-48 bg-section rounded" />
                </div>
                <div className="h-6 w-16 bg-section rounded" />
                <div className="h-4 w-24 bg-section rounded" />
                <div className="h-4 w-20 bg-section rounded" />
                <div className="h-6 w-16 bg-section rounded" />
                <div className="w-8 h-8 bg-section rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


