import { useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography, Button, Tabs, Tab, TextField, IconButton, Tooltip } from "@mui/material";
import { CloudUpload, Download, AutoAwesome, ArrowBack, Undo, Redo } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";
import { useUndoRedo } from "@/hooks/useUndoRedo";

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
  const notes = useUndoRedo("");

  // Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z or Ctrl+Y redo — scoped to the notes textarea.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || t.tagName !== "TEXTAREA") return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) {
        e.preventDefault();
        notes.undo();
      } else if ((k === "z" && e.shiftKey) || k === "y") {
        e.preventDefault();
        notes.redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [notes]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Go back (Ctrl/Cmd+B)">
          <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }} aria-label="Go back">
            <ArrowBack fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h4" component="h1">Notes Summarizer</Typography>
          <Typography color="text.secondary">Paste long notes or upload a file. Get crisp interview-ready summaries.</Typography>
        </Box>
      </Box>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <TextField
            multiline
            minRows={5}
            fullWidth
            placeholder="Paste your notes here…"
            value={notes.value}
            onChange={(e) => notes.set(e.target.value)}
            aria-label="Notes input"
          />
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            <Tooltip title="Generate an AI summary of your notes">
              <span>
                <Button variant="contained" startIcon={<AutoAwesome />} disabled={!notes.value.trim()}>
                  Generate summary
                </Button>
              </span>
            </Tooltip>
            <Tooltip title="Upload a .txt, .md, or .pdf file">
              <Button variant="outlined" startIcon={<CloudUpload />}>Upload file</Button>
            </Tooltip>
            <Box sx={{ flex: 1 }} />
            <Tooltip title="Undo (Ctrl/Cmd+Z)">
              <span>
                <IconButton onClick={notes.undo} disabled={!notes.canUndo} aria-label="Undo">
                  <Undo />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Redo (Ctrl/Cmd+Shift+Z)">
              <span>
                <IconButton onClick={notes.redo} disabled={!notes.canRedo} aria-label="Redo">
                  <Redo />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: "divider", px: 2 }} aria-label="Summary length">
          <Tab label="Short summary" />
          <Tab label="Detailed summary" />
        </Tabs>
        <CardContent>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
            {tab === 0 ? short : long}
          </Typography>
          <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Tooltip title="Download summary as a .txt file">
              <Button startIcon={<Download />}>Download as .txt</Button>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
