import {
  Box, Card, CardContent, Grid, Typography, LinearProgress, Avatar, Button, Chip, Stack,
} from "@mui/material";
import {
  TrendingUp, LocalFireDepartment, EmojiEvents, SmartToy, Quiz as QuizIcon,
  RecordVoiceOver, Article, ArrowForward,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";
import { useAppSelector } from "@/store";

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: `${accent}22`, color: accent, width: 48, height: 48 }}>{icon}</Avatar>
          <Box>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

const activities = [
  { icon: <QuizIcon />, title: "Completed Spring Boot quiz", meta: "Scored 18/20 · 2h ago" },
  { icon: <RecordVoiceOver />, title: "Mock interview · Microservices", meta: "42 min · yesterday" },
  { icon: <Article />, title: "Uploaded resume_v3.pdf", meta: "Analyzed · 2 days ago" },
  { icon: <SmartToy />, title: "Chat: SQL window functions", meta: "12 messages · 3 days ago" },
];

const quickActions = [
  { to: "/assistant", title: "Ask AI", desc: "Get instant help on any topic", color: "#6366f1" },
  { to: "/mock-interview", title: "Start mock interview", desc: "Live AI-driven session", color: "#06b6d4" },
  { to: "/quiz", title: "Take a quiz", desc: "Sharpen with MCQs", color: "#10b981" },
  { to: "/resume", title: "Analyze resume", desc: "Get score + tips", color: "#f59e0b" },
];

export default function Dashboard() {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Stack spacing={3}>
      <Card
        sx={{
          color: "#fff",
          background: "linear-gradient(135deg,#4f46e5 0%,#6366f1 45%,#06b6d4 100%)",
          border: 0,
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Chip
                label="Interview ready in ~12 days"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", mb: 1.5 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Welcome back, {user?.name?.split(" ")[0]} 👋
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.9 }}>
                You're on a 7-day streak. Let's keep the momentum going with today's mock interview.
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
                <Button
                  component={Link} to="/mock-interview" variant="contained"
                  sx={{ bgcolor: "#fff", color: "#4f46e5", "&:hover": { bgcolor: "#f1f5f9" } }}
                  endIcon={<ArrowForward />}
                >
                  Start today's session
                </Button>
                <Button
                  component={Link} to="/study-plan" variant="outlined"
                  sx={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
                >
                  View study plan
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ bgcolor: "rgba(255,255,255,0.12)", p: 2.5, borderRadius: 3 }}>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>Interview readiness</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>78%</Typography>
                <LinearProgress
                  variant="determinate" value={78}
                  sx={{
                    mt: 1, height: 8, borderRadius: 5, bgcolor: "rgba(255,255,255,0.2)",
                    "& .MuiLinearProgress-bar": { bgcolor: "#fff" },
                  }}
                />
                <Typography variant="caption" sx={{ opacity: 0.85, mt: 1, display: "block" }}>
                  +12% from last week
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<LocalFireDepartment />} label="Study streak" value="7 days" accent="#f59e0b" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<TrendingUp />} label="Topics mastered" value="14 / 32" accent="#10b981" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<QuizIcon />} label="Quiz avg." value="86%" accent="#6366f1" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<EmojiEvents />} label="Mock interviews" value="9" accent="#06b6d4" />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Quick actions</Typography>
              </Stack>
              <Grid container spacing={2}>
                {quickActions.map((q) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={q.to}>
                    <Card
                      component={Link} to={q.to}
                      sx={{
                        textDecoration: "none", p: 2.5, height: "100%", display: "block",
                        border: 1, borderColor: "divider",
                        transition: "all .2s",
                        "&:hover": { transform: "translateY(-2px)", borderColor: q.color, boxShadow: 3 },
                      }}
                    >
                      <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: `${q.color}22`, color: q.color, display: "grid", placeItems: "center", mb: 1.5 }}>
                        <ArrowForward fontSize="small" />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{q.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{q.desc}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent activity</Typography>
              <Stack spacing={2}>
                {activities.map((a, i) => (
                  <Stack direction="row" spacing={2} key={i} alignItems="center">
                    <Avatar sx={{ bgcolor: "action.hover", color: "primary.main", width: 36, height: 36 }}>
                      {a.icon}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>{a.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{a.meta}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Topic-wise progress</Typography>
          <Stack spacing={2.5}>
            {[
              { name: "Java Core", pct: 92 },
              { name: "Spring Boot", pct: 81 },
              { name: "Microservices", pct: 64 },
              { name: "SQL", pct: 73 },
              { name: "DSA", pct: 48 },
            ].map((t) => (
              <Box key={t.name}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{t.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{t.pct}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={t.pct} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
