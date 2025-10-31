export interface ParsedHeaders {
  from: string;
  to: string;
  subject: string;
  date: string;
  originIP?: string;
  spf: "pass" | "fail" | "warning" | "neutral";
  dkim: "pass" | "fail" | "warning" | "neutral";
  dmarc: "pass" | "fail" | "warning" | "neutral";
  spfDetails?: string;
  dkimDetails?: string;
  dmarcDetails?: string;
  hops: Array<{
    server: string;
    ip?: string;
    timestamp?: string;
  }>;
}

export const parseEmailHeaders = (headers: string): ParsedHeaders => {
  const lines = headers.split("\n");
  
  const result: ParsedHeaders = {
    from: "",
    to: "",
    subject: "",
    date: "",
    spf: "neutral",
    dkim: "neutral",
    dmarc: "neutral",
    hops: [],
  };

  // Extract basic fields
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    if (lowerLine.startsWith("from:")) {
      result.from = line.substring(5).trim();
    } else if (lowerLine.startsWith("to:")) {
      result.to = line.substring(3).trim();
    } else if (lowerLine.startsWith("subject:")) {
      result.subject = line.substring(8).trim();
    } else if (lowerLine.startsWith("date:")) {
      result.date = line.substring(5).trim();
    }

    // SPF
    if (lowerLine.includes("spf=")) {
      const spfMatch = line.match(/spf=(pass|fail|softfail|neutral|none)/i);
      if (spfMatch) {
        const status = spfMatch[1].toLowerCase();
        if (status === "pass") result.spf = "pass";
        else if (status === "fail") result.spf = "fail";
        else if (status === "softfail") result.spf = "warning";
        else result.spf = "neutral";
        result.spfDetails = line;
      }
    }

    // DKIM
    if (lowerLine.includes("dkim=")) {
      const dkimMatch = line.match(/dkim=(pass|fail|neutral|none)/i);
      if (dkimMatch) {
        const status = dkimMatch[1].toLowerCase();
        if (status === "pass") result.dkim = "pass";
        else if (status === "fail") result.dkim = "fail";
        else result.dkim = "neutral";
        result.dkimDetails = line;
      }
    }

    // DMARC
    if (lowerLine.includes("dmarc=")) {
      const dmarcMatch = line.match(/dmarc=(pass|fail|none)/i);
      if (dmarcMatch) {
        const status = dmarcMatch[1].toLowerCase();
        if (status === "pass") result.dmarc = "pass";
        else if (status === "fail") result.dmarc = "fail";
        else result.dmarc = "neutral";
        result.dmarcDetails = line;
      }
    }

    // Received headers for routing
    if (lowerLine.startsWith("received:")) {
      const receivedLine = line.substring(9).trim();
      const ipMatch = receivedLine.match(/\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/);
      const serverMatch = receivedLine.match(/from\s+([^\s]+)/i);
      const timeMatch = receivedLine.match(/;\s*(.+)$/);

      const hop: any = {
        server: serverMatch ? serverMatch[1] : "Unknown server",
      };

      if (ipMatch) {
        hop.ip = ipMatch[1];
        if (!result.originIP) result.originIP = ipMatch[1];
      }

      if (timeMatch) {
        hop.timestamp = timeMatch[1].trim();
      }

      result.hops.push(hop);
    }
  }

  // Reverse hops so origin is first
  result.hops.reverse();

  return result;
};
