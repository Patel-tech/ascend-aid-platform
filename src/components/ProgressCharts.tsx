import { useEffect, useMemo, useState } from "react";
import {
  Box, Card, CardContent, Grid, Stack, Typography, Chip, LinearProgress, TextField, Tooltip as MuiTooltip,
} from "@mui/material";
import { Flag, Schedule, EmojiEvents } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, Cell,
} from "recharts";

const quizScores = [
  { date: "Wk 1", score: 58, avg: 62 },
  { date: "Wk 2", score: 64, avg: 65 },
  { date: "Wk 3", score: 71, avg: 68 },
  { date: "Wk 4", score: 68, avg: 70 },
  { date: "Wk 5", score: 78, avg: 73 },
  { date: "Wk 6", score: 84, avg: 76 },
  { date: "Wk 7", score: 88, avg: 79 },
];

const topicStrength = [
  { topic: "Java", score: 92 },
  { topic: "Spring", score: 81 },
  { topic: "SQL", score: 73 },
  { topic: "Microservices", score: 64 },
  { topic: "System Design", score: 58 },
  { topic: "DSA", score: 48 },
];

const timePerTopic = [
  { topic: "Java", hours: 6.5 },
  { topic: "Spring", hours: 5.2 },
  { topic: "SQL", hours: 3.8 },
  { topic: "Microservices", hours: 4.1 },
  { topic: "System Design", hours: 2.6 },
  { topic: "DSA", hours: 5.9 },
];

const DEFAULT_TARGET = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const milestones = [
  { label: "Resume polished", at: 25, icon: <Flag fontSize="small" /> },
  { label: "All topics ≥ 70%", at: 50, icon: <EmojiEvents fontSize="small" /> },
  { label: "3 mock interviews", at: 75, icon: <Schedule fontSize="small" /> },
  { label: "Interview ready", at: 100, icon: <EmojiEvents fontSize="small" /> },
];

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, new Date(targetIso).getTime() - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, done: diff === 0 };
  }, [now, targetIso]);
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <Box sx={{
      flex: 1, textAlign: "center", py: 1.5, borderRadius: 2,
      bgcolor: "action.hover", minWidth: 64,
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }} aria-live="polite">
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default function ProgressCharts() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;

  const [target, setTarget] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_TARGET;
    return localStorage.getItem("interview-target-date") || DEFAULT_TARGET;
  });
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("interview-target-date", target);
  }, [target]);

  const { days, hours, minutes, seconds, done } = useCountdown(target);
  // Assume 30-day prep window; clamp progress
  const totalWindow = 30;
  const progressPct = Math.min(100, Math.max(0, ((totalWindow - days) / totalWindow) * 100));

  const colorFor = (score: number) =>
    score >= 80 ? success : score >= 65 ? primary : score >= 50 ? warning : error;

  return (
    <Grid container spacing={2.5}>
      {/* Countdown */}
      <Grid size={{ xs: 12 }} sx={{ minWidth: 0 }}>
        <Card sx={{ border: 1, borderColor: "divider", minWidth: 0 }}>
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}>
              <Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                  <Typography variant="h6" component="h2">Target interview countdown</Typography>
                  {done && <Chip color="success" size="small" label="It's go time!" />}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Stay on track with milestones leading up to your big day.
                </Typography>
                <MuiTooltip title="Pick your target interview date">
                  <TextField
                    type="date"
                    size="small"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    sx={{ mt: 1.5, maxWidth: 200 }}
                    slotProps={{ htmlInput: { "aria-label": "Target interview date" } }}
                  />
                </MuiTooltip>
              </Box>
              <Stack direction="row" spacing={1.25} sx={{ flex: 1, maxWidth: 480 }}>
                <TimeBox value={days} label="Days" />
                <TimeBox value={hours} label="Hours" />
                <TimeBox value={minutes} label="Min" />
                <TimeBox value={seconds} label="Sec" />
              </Stack>
            </Stack>

            <Box sx={{ mt: 3, position: "relative" }}>
              <LinearProgress
                variant="determinate"
                value={progressPct}
                sx={{ height: 10, borderRadius: 5 }}
                aria-label="Prep timeline progress"
              />
              <Stack direction="row" sx={{ mt: 1.5, justifyContent: "space-between" }}>
                {milestones.map((m) => {
                  const reached = progressPct >= m.at;
                  return (
                    <MuiTooltip key={m.label} title={`${m.label} (${m.at}%)`}>
                      <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0, alignItems: "center" }}>
                        <Box sx={{
                          width: 30, height: 30, borderRadius: "50%",
                          display: "grid", placeItems: "center",
                          bgcolor: reached ? `${primary}22` : "action.hover",
                          color: reached ? primary : "text.secondary",
                          border: 1, borderColor: reached ? primary : "divider",
                        }}>
                          {m.icon}
                        </Box>
                        <Typography variant="caption" color={reached ? "text.primary" : "text.secondary"} sx={{
                          textAlign: "center", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {m.label}
                        </Typography>
                      </Stack>
                    </MuiTooltip>
                  );
                })}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Quiz scores over time */}
      <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
        <Card sx={{ border: 1, borderColor: "divider", height: "100%", minWidth: 0 }}>
          <CardContent sx={{ minWidth: 0 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Quiz scores over time</Typography>
            <Box sx={{ height: 280, minHeight: 280, width: "100%", minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 640, height: 280 }}>
                <LineChart data={quizScores}>
                  <CartesianGrid stroke={theme.palette.divider} vertical={false} />
                  <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="Your score" stroke={primary} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="avg" name="Cohort average" stroke={secondary} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Time per topic */}
      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
        <Card sx={{ border: 1, borderColor: "divider", height: "100%", minWidth: 0 }}>
          <CardContent>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Time spent this week</Typography>
            <Stack spacing={1.5}>
              {timePerTopic.map((t) => {
                const max = Math.max(...timePerTopic.map((x) => x.hours));
                const pct = (t.hours / max) * 100;
                return (
                  <Box key={t.topic}>
                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{t.topic}</Typography>
                      <Typography variant="body2" color="text.secondary">{t.hours.toFixed(1)} h</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{ height: 6, borderRadius: 3 }}
                      aria-label={`${t.topic}: ${t.hours} hours`}
                    />
                  </Box>
                );
              })}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
              Total: {timePerTopic.reduce((s, t) => s + t.hours, 0).toFixed(1)} hours
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Topic strengths & weaknesses */}
      <Grid size={{ xs: 12 }} sx={{ minWidth: 0 }}>
        <Card sx={{ border: 1, borderColor: "divider", minWidth: 0 }}>
          <CardContent sx={{ minWidth: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">Topic strengths & weaknesses</Typography>
              <Stack direction="row" spacing={1}>
                <Chip size="small" label="Strong ≥ 80" sx={{ bgcolor: `${success}22`, color: success }} />
                <Chip size="small" label="Solid ≥ 65" sx={{ bgcolor: `${primary}22`, color: primary }} />
                <Chip size="small" label="Improve ≥ 50" sx={{ bgcolor: `${warning}22`, color: warning }} />
                <Chip size="small" label="Focus < 50" sx={{ bgcolor: `${error}22`, color: error }} />
              </Stack>
            </Stack>
            <Box sx={{ height: 300, minHeight: 300, width: "100%", minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 900, height: 300 }}>
                <BarChart data={topicStrength} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid stroke={theme.palette.divider} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke={theme.palette.text.secondary} />
                  <YAxis type="category" dataKey="topic" stroke={theme.palette.text.secondary} width={110} />
                  <Tooltip contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                    {topicStrength.map((t) => (
                      <Cell key={t.topic} fill={colorFor(t.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
