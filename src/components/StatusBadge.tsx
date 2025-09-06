import { cn } from "@/lib/utils";

type Status = "pending" | "in-progress" | "resolved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "status-pending",
  },
  "in-progress": {
    label: "In Progress", 
    className: "status-in-progress",
  },
  resolved: {
    label: "Resolved",
    className: "status-resolved",
  },
  rejected: {
    label: "Rejected",
    className: "status-rejected",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn("status-badge", config.className, className)}>
      {config.label}
    </span>
  );
};