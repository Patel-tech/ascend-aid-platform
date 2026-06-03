import { useState } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, Grid, TextField, Chip, LinearProgress, Avatar,
} from "@mui/material";
import { AutoAwesome, CheckCircleOutline } from "@mui/icons-material";

const weeks = [
  { w: "Week 1", focus: "Java Core + OOP deep dive", pct: 100 },
  { w: "Week 2", focus: "Spring Boot & Spring Data", pct: 80 },
  { w: "Week 3", focus: "Microservices patterns", pct: 45 },
  { w: "Week 4", focus: "SQL + System Design", pct: 10 },
  { w: "Week 5", focus: "Mock interviews & polish", pct: 0 },
];

export default function StudyPlanPage() {
  const [exp, setExp] = useState("3");
  const [date, setDate] = useState("");
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Personalized study plan</Typography>
        <Typography color="text.secondary">A roadmap tailored to your experience and target date.</Typography>
      </Box>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Years of experience" type="number" value={exp} onChange={(e) => setExp(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Target interview date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button fullWidth variant="contained" startIcon={<AutoAwesome />}>Generate plan</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ position: "relative", pl: 4 }}>
        <Box sx={{ position: "absolute", left: 18, top: 18, bottom: 18, width: 2, bgcolor: "divider" }} />
        <Stack spacing={2.5}>
          {weeks.map((w, i) => (
            <Box key={w.w} sx={{ position: "relative" }}>
              <Avatar sx={{ position: "absolute", left: -38, top: 18, bgcolor: w.pct === 100 ? "success.main" : "primary.main", width: 36, height: 36 }}>
                {w.pct === 100 ? <CheckCircleOutline /> : i + 1}
              </Avatar>
              <Card sx={{ border: 1, borderColor: "divider" }}>
                <CardContent>
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="overline" color="text.secondary">{w.w}</Typography>
                      <Typography variant="h6">{w.focus}</Typography>
                    </Box>
                    <Chip label={`${w.pct}%`} color={w.pct === 100 ? "success" : "primary"} variant="outlined" />
                  </Stack>
                  <LinearProgress variant="determinate" value={w.pct} sx={{ mt: 1.5, height: 6, borderRadius: 3 }} />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
