import { useState } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, TextField, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, IconButton, LinearProgress,
} from "@mui/material";
import { CloudUpload, Search, DeleteOutlined, Description } from "@mui/icons-material";

const seed = [
  { name: "spring-boot-reference.pdf", size: "2.4 MB", date: "2 days ago", status: "Processed" },
  { name: "system-design-notes.docx", size: "812 KB", date: "1 week ago", status: "Processed" },
  { name: "dsa-cheatsheet.pdf", size: "1.1 MB", date: "today", status: "Processing" },
  { name: "sql-handbook.txt", size: "98 KB", date: "3 days ago", status: "Processed" },
];

export default function DocumentsPage() {
  const [dragOver, setDragOver] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState(seed);
  const filtered = docs.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Documents</Typography>
        <Typography color="text.secondary">Upload notes, references, and PDFs. PrepPilot indexes them for instant retrieval.</Typography>
      </Box>

      <Card
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
        sx={{
          border: "2px dashed", borderColor: dragOver ? "primary.main" : "divider",
          bgcolor: dragOver ? "action.hover" : "transparent",
          textAlign: "center", p: 5, transition: "all .2s",
        }}
      >
        <CloudUpload sx={{ fontSize: 56, color: "primary.main", mb: 1 }} />
        <Typography variant="h6">Drop files here or click to upload</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          PDF, DOCX, TXT · up to 25 MB each
        </Typography>
        <Button variant="contained" startIcon={<CloudUpload />}>Select files</Button>
        <Box sx={{ mt: 3, maxWidth: 480, mx: "auto" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption">dsa-cheatsheet.pdf</Typography>
            <Typography variant="caption" color="text.secondary">68%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={68} sx={{ height: 6, borderRadius: 3 }} />
        </Box>
      </Card>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Your documents</Typography>
            <TextField
              size="small" placeholder="Search…"
              value={query} onChange={(e) => setQuery(e.target.value)}
              slotProps={{ input: { startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "text.secondary" }} /> } }}
            />
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Uploaded</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.name} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Description color="primary" />
                      <Typography variant="body2">{d.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{d.size}</TableCell>
                  <TableCell>{d.date}</TableCell>
                  <TableCell>
                    <Chip
                      size="small" label={d.status}
                      color={d.status === "Processed" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => setDocs((s) => s.filter((x) => x.name !== d.name))}>
                      <DeleteOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
}
