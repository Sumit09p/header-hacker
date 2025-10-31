import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route, ArrowRight } from "lucide-react";

interface Hop {
  server: string;
  ip?: string;
  timestamp?: string;
}

interface RoutingSectionProps {
  hops: Hop[];
}

export const RoutingSection = ({ hops }: RoutingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          Email Routing Path ({hops.length} hops)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hops.length === 0 ? (
          <p className="text-sm text-muted-foreground">No routing information found</p>
        ) : (
          <div className="space-y-3">
            {hops.map((hop, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-mono text-sm font-medium break-all">{hop.server}</p>
                    {hop.ip && <p className="font-mono text-xs text-muted-foreground">IP: {hop.ip}</p>}
                    {hop.timestamp && <p className="text-xs text-muted-foreground">{hop.timestamp}</p>}
                  </div>
                </div>
                {index < hops.length - 1 && (
                  <div className="ml-4 mt-2 mb-2 flex items-center text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
