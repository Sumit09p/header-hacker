import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Shield } from "lucide-react";

interface AuthenticationSectionProps {
  spf: "pass" | "fail" | "warning" | "neutral";
  dkim: "pass" | "fail" | "warning" | "neutral";
  dmarc: "pass" | "fail" | "warning" | "neutral";
  spfDetails?: string;
  dkimDetails?: string;
  dmarcDetails?: string;
}

export const AuthenticationSection = ({
  spf,
  dkim,
  dmarc,
  spfDetails,
  dkimDetails,
  dmarcDetails,
}: AuthenticationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Authentication Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">SPF (Sender Policy Framework)</span>
            <StatusBadge status={spf} label={spf.toUpperCase()} />
          </div>
          {spfDetails && (
            <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">{spfDetails}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">DKIM (DomainKeys Identified Mail)</span>
            <StatusBadge status={dkim} label={dkim.toUpperCase()} />
          </div>
          {dkimDetails && (
            <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">{dkimDetails}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">DMARC (Domain-based Message Authentication)</span>
            <StatusBadge status={dmarc} label={dmarc.toUpperCase()} />
          </div>
          {dmarcDetails && (
            <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">{dmarcDetails}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
