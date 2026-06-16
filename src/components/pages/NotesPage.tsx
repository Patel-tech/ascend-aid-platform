import { useState } from "react";
import { Box, Card, CardContent, Stack, Typography, Button, Tabs, Tab, TextField, IconButton } from "@mui/material";
import { CloudUpload, Download, AutoAwesome, ArrowBack } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const short = "Microservices decompose a single application into small, independently deployable services that communicate over the network — typically HTTP/gRPC.";
const long = `Microservices architecture is an approach where a system is built as a collection of small, autonomous services.

Key principles:
• Single responsibility per service
• Independently deployable & scalable
• Owned by small cross-functional teams
• Communicate via lightweight protocols (HTTP, gRPC, async messaging)
• Decentralized data ownership — each service typically owns its database

Trade-offs:
• Operational complexity (deploy, monitor, trace)
• Eventual consistency between services
• Network latency & partial failures
• Requires DevOps maturity (CI/CD, IaC, observability)`;

export default function NotesPage() {
  const [tab, setTab] = useState(0);
  const router = useRouter();
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h4">Notes Summarizer</Typography>
          <Typography color="text.secondary">Paste long notes or upload a file. Get crisp interview-ready summaries.</Typography>
        </Box>
      </Box>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <TextField multiline minRows={5} fullWidth placeholder="Paste your notes here…" />
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" startIcon={<AutoAwesome />}>Generate summary</Button>
            <Button variant="outlined" startIcon={<CloudUpload />}>Upload file</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tab label="Short summary" />
          <Tab label="Detailed summary" />
        </Tabs>
        <CardContent>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
            {tab === 0 ? short : long}
          </Typography>
          <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Button startIcon={<Download />}>Download as .txt</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
