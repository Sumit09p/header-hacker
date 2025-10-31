import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface RawHeadersSectionProps {
  headers: string;
}

export const RawHeadersSection = ({ headers }: RawHeadersSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Raw Headers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs font-mono bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
          {headers}
        </pre>
      </CardContent>
    </Card>
  );
};
