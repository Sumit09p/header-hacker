import { useState } from "react";
import { Shield } from "lucide-react";
import { HeaderInput } from "@/components/HeaderInput";
import { SummarySection } from "@/components/SummarySection";
import { AuthenticationSection } from "@/components/AuthenticationSection";
import { RoutingSection } from "@/components/RoutingSection";
import { RawHeadersSection } from "@/components/RawHeadersSection";
import { parseEmailHeaders, ParsedHeaders } from "@/utils/headerParser";
import { toast } from "sonner";

const Index = () => {
  const [headerInput, setHeaderInput] = useState("");
  const [parsedData, setParsedData] = useState<ParsedHeaders | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!headerInput.trim()) {
      toast.error("Please paste email headers to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        const parsed = parseEmailHeaders(headerInput);
        setParsedData(parsed);
        toast.success("Headers analyzed successfully");
      } catch (error) {
        toast.error("Failed to parse headers. Please check the format.");
        console.error(error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Email Header Analyzer</h1>
              <p className="text-sm text-muted-foreground">
                Analyze email authentication, routing, and security indicators
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Input Section */}
          <HeaderInput
            value={headerInput}
            onChange={setHeaderInput}
            onAnalyze={handleAnalyze}
            isLoading={isAnalyzing}
          />

          {/* Results Section */}
          {parsedData && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid gap-6 md:grid-cols-2">
                <SummarySection
                  from={parsedData.from}
                  to={parsedData.to}
                  subject={parsedData.subject}
                  date={parsedData.date}
                  originIP={parsedData.originIP}
                />
                <AuthenticationSection
                  spf={parsedData.spf}
                  dkim={parsedData.dkim}
                  dmarc={parsedData.dmarc}
                  spfDetails={parsedData.spfDetails}
                  dkimDetails={parsedData.dkimDetails}
                  dmarcDetails={parsedData.dmarcDetails}
                />
              </div>

              <RoutingSection hops={parsedData.hops} />
              
              <RawHeadersSection headers={headerInput} />
            </div>
          )}

          {/* Example Section */}
          {!parsedData && (
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-3 font-semibold">How to use:</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Open an email in your mail client (Gmail, Outlook, etc.)</li>
                <li>2. Find the option to "View Original" or "Show Original Headers"</li>
                <li>3. Copy all the header information</li>
                <li>4. Paste it in the text area above and click "Analyze Headers"</li>
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                The analyzer will extract authentication results (SPF, DKIM, DMARC), routing path, sender/recipient
                information, and security indicators.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>CNS Mini Project - Email Header Analyzer</p>
          <p className="mt-1">Analyze email security and routing for network security purposes</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
