import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface HeaderInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading?: boolean;
}

export const HeaderInput = ({ value, onChange, onAnalyze, isLoading }: HeaderInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Header Input</CardTitle>
        <CardDescription>
          Paste your email headers below to analyze sender authentication, routing path, and security indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste email headers here (e.g., Received, From, To, Subject, SPF, DKIM, DMARC...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
        <Button onClick={onAnalyze} disabled={!value.trim() || isLoading} className="w-full">
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? "Analyzing..." : "Analyze Headers"}
        </Button>
      </CardContent>
    </Card>
  );
};
