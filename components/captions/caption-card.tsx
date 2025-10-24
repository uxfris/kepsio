import { Caption } from "../../types";

interface CaptionCardProps {
  caption: Caption;
  onEdit?: (caption: Caption) => void;
  onDelete?: (caption: Caption) => void;
}

export default function CaptionCard({
  caption,
  onEdit,
  onDelete,
}: CaptionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-2">
        <p className="text-gray-900">{caption.content}</p>
        {caption.context && (
          <p className="text-sm text-gray-600 mt-2">
            Context: {caption.context}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(caption.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(caption)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(caption)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
