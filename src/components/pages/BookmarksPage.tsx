import { useState } from "react";
import { Box, Card, CardContent, Stack, Typography, TextField, Chip, IconButton } from "@mui/material";
import { Search, BookmarkRemove, ArrowBack } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const bookmarks = [
  { topic: "Spring Boot", q: "How does Spring Boot's @ConditionalOnClass work?", a: "It registers a bean only if the specified class is present on the classpath at evaluation time." },
  { topic: "DSA", q: "Explain Kadane's algorithm.", a: "O(n) algorithm to find the maximum sum contiguous subarray by maintaining a running max ending at each index." },
  { topic: "SQL", q: "Difference between WHERE and HAVING?", a: "WHERE filters rows before grouping; HAVING filters aggregated groups after GROUP BY." },
  { topic: "System Design", q: "What is a CDN and when to use one?", a: "Content Delivery Network — geographically distributed caches that serve static assets close to users." },
];

export default function BookmarksPage() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const list = bookmarks.filter((b) =>
    (b.q + b.a + b.topic).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h4">Bookmarks</Typography>
          <Typography color="text.secondary">Saved questions and answers for quick revision.</Typography>
        </Box>
      </Box>
      <TextField
        size="small" placeholder="Search bookmarks…" value={q} onChange={(e) => setQ(e.target.value)}
        slotProps={{ input: { startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "text.secondary" }} /> } }}
      />
      <Stack spacing={2}>
        {list.map((b, i) => (
          <Card key={i} sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Chip label={b.topic} size="small" sx={{ mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{b.q}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{b.a}</Typography>
                </Box>
                <IconButton><BookmarkRemove /></IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
