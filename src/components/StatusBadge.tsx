import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "pass" | "fail" | "warning" | "neutral";
  label: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const variants = {
    pass: { icon: CheckCircle2, className: "bg-success text-success-foreground" },
    fail: { icon: XCircle, className: "bg-destructive text-destructive-foreground" },
    warning: { icon: AlertTriangle, className: "bg-warning text-warning-foreground" },
    neutral: { icon: HelpCircle, className: "bg-muted text-muted-foreground" },
  };

  const { icon: Icon, className } = variants[status];

  return (
    <Badge className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
};
