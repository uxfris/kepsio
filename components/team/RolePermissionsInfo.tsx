import { AlertCircle } from "lucide-react";

export function RolePermissionsInfo() {
  const permissions = [
    {
      role: "Owner",
      description: "Full access, billing, team management",
    },
    {
      role: "Admin",
      description: "Manage team, approve captions",
    },
    {
      role: "Editor",
      description: "Create, edit, and share captions",
    },
    {
      role: "Viewer",
      description: "View shared captions only",
    },
  ];

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Team Role Permissions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-800">
            {permissions.map((perm) => (
              <div key={perm.role}>
                <span className="font-medium">{perm.role}:</span>{" "}
                {perm.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
