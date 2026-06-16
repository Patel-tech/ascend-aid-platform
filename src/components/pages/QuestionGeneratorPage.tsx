import { useState } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, FormControl, InputLabel, Select, MenuItem,
  Grid, IconButton, Chip,
} from "@mui/material";
import { AutoAwesome, BookmarkBorder, PictureAsPdf, ArrowBack } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const sample = [
  { q: "Explain how Java's garbage collector handles the young generation.", t: "Concept" },
  { q: "Implement an LRU cache in Java.", t: "Coding" },
  { q: "Difference between optimistic vs pessimistic locking.", t: "Concept" },
  { q: "Design a URL shortener.", t: "System Design" },
  { q: "What is the N+1 query problem and how do you solve it?", t: "Hibernate" },
];

export default function QuestionGeneratorPage() {
  const [topic, setTopic] = useState("Spring Boot");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState(sample);
  const router = useRouter();

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h4">Question Generator</Typography>
          <Typography color="text.secondary">Generate fresh interview questions tailored to topic & difficulty.</Typography>
        </Box>
      </Box>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Topic</InputLabel>
                <Select value={topic} label="Topic" onChange={(e) => setTopic(e.target.value)}>
                  {["Java", "Spring Boot", "Hibernate", "Microservices", "SQL", "DSA", "System Design"].map((x) => (
                    <MenuItem key={x} value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Difficulty</InputLabel>
                <Select value={difficulty} label="Difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                  {["Easy", "Medium", "Hard", "Expert"].map((x) => (
                    <MenuItem key={x} value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack direction="row" spacing={1}>
                <Button fullWidth variant="contained" startIcon={<AutoAwesome />} onClick={() => setQuestions([...sample].sort(() => Math.random() - 0.5))}>
                  Generate
                </Button>
                <Button variant="outlined" startIcon={<PictureAsPdf />}>Export</Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {questions.map((q, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
              <CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }} spacing={1}>
                  <Box>
                    <Chip label={q.t} size="small" sx={{ mb: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{q.q}</Typography>
                  </Box>
                  <IconButton><BookmarkBorder /></IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
