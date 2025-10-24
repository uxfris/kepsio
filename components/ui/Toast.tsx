import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cn } from "../../lib/utils/cn";
import { Check, X, Copy, Bookmark, AlertCircle, Info } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 3000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  return (
    <div className="fixed top-4 right-4 z-toast space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const duration = toast.duration || 4000;

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 50);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, isHovered]);

  const getIcon = () => {
    if (toast.icon) return toast.icon;

    switch (toast.type) {
      case "success":
        return <Check className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          container: "bg-white border-green-200 shadow-green-100/50",
          icon: "text-green-600 bg-green-50",
          progress: "bg-green-500",
          closeButton: "hover:bg-green-50 text-green-600",
        };
      case "error":
        return {
          container: "bg-white border-red-200 shadow-red-100/50",
          icon: "text-red-600 bg-red-50",
          progress: "bg-red-500",
          closeButton: "hover:bg-red-50 text-red-600",
        };
      case "warning":
        return {
          container: "bg-white border-yellow-200 shadow-yellow-100/50",
          icon: "text-yellow-600 bg-yellow-50",
          progress: "bg-yellow-500",
          closeButton: "hover:bg-yellow-50 text-yellow-600",
        };
      case "info":
        return {
          container: "bg-white border-blue-200 shadow-blue-100/50",
          icon: "text-blue-600 bg-blue-50",
          progress: "bg-blue-500",
          closeButton: "hover:bg-blue-50 text-blue-600",
        };
      default:
        return {
          container: "bg-white border-gray-200 shadow-gray-100/50",
          icon: "text-gray-600 bg-gray-50",
          progress: "bg-gray-500",
          closeButton: "hover:bg-gray-50 text-gray-600",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-80 pointer-events-auto",
        "animate-in slide-in-from-right-full fade-in-0 duration-300 ease-out",
        "backdrop-blur-sm bg-white/95",
        styles.container
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-xl overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-75 ease-linear",
            styles.progress
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Icon */}
      {getIcon() && (
        <div className={cn("shrink-0 p-2 rounded-lg", styles.icon)}>
          {getIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 pr-2">
        <p className="font-semibold text-sm text-gray-900 leading-tight">
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => onRemove(toast.id)}
        className={cn(
          "shrink-0 p-1.5 rounded-lg transition-all duration-200",
          "hover:scale-105 active:scale-95",
          styles.closeButton
        )}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Convenience functions for common toast types
export const toast = {
  success: (title: string, description?: string) => ({
    type: "success" as const,
    title,
    description,
    icon: <Check className="w-5 h-5" />,
  }),
  error: (title: string, description?: string) => ({
    type: "error" as const,
    title,
    description,
    icon: <X className="w-5 h-5" />,
  }),
  warning: (title: string, description?: string) => ({
    type: "warning" as const,
    title,
    description,
    icon: <AlertCircle className="w-5 h-5" />,
  }),
  info: (title: string, description?: string) => ({
    type: "info" as const,
    title,
    description,
    icon: <Info className="w-5 h-5" />,
  }),
  copied: (title: string = "Copied to clipboard!") => ({
    type: "success" as const,
    title,
    icon: <Copy className="w-5 h-5" />,
  }),
  saved: (title: string = "Saved to library!") => ({
    type: "success" as const,
    title,
    icon: <Bookmark className="w-5 h-5" />,
  }),
};
