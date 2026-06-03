import { Box, Card, CardContent, Stack, Typography, Grid, LinearProgress, Avatar } from "@mui/material";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
} from "recharts";
import { useTheme } from "@mui/material/styles";

const progress = [
  { d: "Mon", v: 35 }, { d: "Tue", v: 52 }, { d: "Wed", v: 48 },
  { d: "Thu", v: 70 }, { d: "Fri", v: 78 }, { d: "Sat", v: 65 }, { d: "Sun", v: 82 },
];
const quizPerf = [
  { name: "Java", score: 88 }, { name: "Spring", score: 82 },
  { name: "SQL", score: 74 }, { name: "DSA", score: 56 }, { name: "Sys Design", score: 68 },
];
const radar = [
  { topic: "Java", you: 88, target: 90 },
  { topic: "Spring", you: 82, target: 88 },
  { topic: "SQL", you: 74, target: 85 },
  { topic: "DSA", you: 56, target: 80 },
  { topic: "Sys Design", you: 68, target: 85 },
  { topic: "Behavioral", you: 80, target: 85 },
];

export default function AnalyticsPage() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Analytics</Typography>
        <Typography color="text.secondary">Track your interview readiness across topics over time.</Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 96, height: 96, mx: "auto", mb: 1.5, bgcolor: "primary.main", fontSize: 30, fontWeight: 700 }}>78</Avatar>
              <Typography variant="h6">Interview readiness</Typography>
              <Typography variant="body2" color="text.secondary">Up 12% this week</Typography>
              <LinearProgress variant="determinate" value={78} sx={{ mt: 2, height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Learning progress (last 7 days)</Typography>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer>
                  <AreaChart data={progress}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={primary} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="d" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Area type="monotone" dataKey="v" stroke={primary} fill="url(#g1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Quiz performance by topic</Typography>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={quizPerf}>
                    <CartesianGrid stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Bar dataKey="score" fill={primary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Strengths vs targets</Typography>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer>
                  <RadarChart data={radar}>
                    <PolarGrid stroke={theme.palette.divider} />
                    <PolarAngleAxis dataKey="topic" stroke={theme.palette.text.secondary} />
                    <PolarRadiusAxis stroke={theme.palette.text.secondary} />
                    <Radar name="You" dataKey="you" stroke={primary} fill={primary} fillOpacity={0.35} />
                    <Radar name="Target" dataKey="target" stroke={secondary} fill={secondary} fillOpacity={0.15} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
