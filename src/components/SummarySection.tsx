import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Calendar, MapPin } from "lucide-react";

interface SummarySectionProps {
  from: string;
  to: string;
  subject: string;
  date: string;
  originIP?: string;
}

export const SummarySection = ({ from, to, subject, date, originIP }: SummarySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">From</p>
            <p className="font-mono text-sm break-all">{from || "Not found"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">To</p>
            <p className="font-mono text-sm break-all">{to || "Not found"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Subject</p>
            <p className="text-sm break-words">{subject || "Not found"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Date</p>
            <p className="text-sm">{date || "Not found"}</p>
          </div>
        </div>
        {originIP && (
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Origin IP</p>
              <p className="font-mono text-sm">{originIP}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
