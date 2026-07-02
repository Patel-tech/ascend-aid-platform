import { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Grid, Typography, Avatar, Stack, Chip, LinearProgress,
  Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Divider, Button,
} from "@mui/material";
import {
  EmojiEvents, LocalFireDepartment, Star, WorkspacePremium, Bolt, MilitaryTech,
  TrendingUp, Verified, Lock, ArrowForward,
} from "@mui/icons-material";
import { useAppSelector } from "@/store";

type Metric = "points" | "streak" | "quizzes" | "interviews";

interface LeaderRow {
  rank: number;
  name: string;
  avatarColor: string;
  points: number;
  streak: number;
  quizzes: number;
  interviews: number;
  level: string;
  country: string;
}

const rows: LeaderRow[] = [
  { rank: 1, name: "Priya Sharma",  avatarColor: "#f59e0b", points: 9840, streak: 42, quizzes: 128, interviews: 31, level: "Expert",       country: "🇮🇳" },
  { rank: 2, name: "Diego Alvarez", avatarColor: "#06b6d4", points: 9120, streak: 28, quizzes: 111, interviews: 26, level: "Expert",       country: "🇪🇸" },
  { rank: 3, name: "Mei Tanaka",    avatarColor: "#ec4899", points: 8760, streak: 35, quizzes: 104, interviews: 22, level: "Advanced",     country: "🇯🇵" },
  { rank: 4, name: "Liam O'Brien",  avatarColor: "#10b981", points: 7980, streak: 19, quizzes:  92, interviews: 20, level: "Advanced",     country: "🇮🇪" },
  { rank: 5, name: "Aarav Patel",   avatarColor: "#6366f1", points: 7420, streak:  7, quizzes:  86, interviews:  9, level: "Advanced",     country: "🇮🇳" },
  { rank: 6, name: "Sofia Rossi",   avatarColor: "#8b5cf6", points: 6890, streak: 14, quizzes:  78, interviews: 15, level: "Intermediate", country: "🇮🇹" },
  { rank: 7, name: "Noah Kim",      avatarColor: "#ef4444", points: 6210, streak: 11, quizzes:  71, interviews: 12, level: "Intermediate", country: "🇰🇷" },
  { rank: 8, name: "Amara Okafor",  avatarColor: "#14b8a6", points: 5680, streak: 22, quizzes:  64, interviews: 10, level: "Intermediate", country: "🇳🇬" },
  { rank: 9, name: "Lucas Meyer",   avatarColor: "#f97316", points: 5120, streak:  4, quizzes:  58, interviews:  8, level: "Intermediate", country: "🇩🇪" },
  { rank:10, name: "Yuki Sato",     avatarColor: "#3b82f6", points: 4610, streak:  9, quizzes:  52, interviews:  7, level: "Beginner",     country: "🇯🇵" },
];

const levels = [
  { name: "Beginner",     min:    0, color: "#94a3b8" },
  { name: "Intermediate", min: 2500, color: "#06b6d4" },
  { name: "Advanced",     min: 6000, color: "#6366f1" },
  { name: "Expert",       min: 9000, color: "#f59e0b" },
];

const achievements = [
  { name: "First Steps",     desc: "Complete your first quiz",         icon: <Star />,               color: "#10b981", earned: true  },
  { name: "Perfect Score",   desc: "Score 100% on any quiz",           icon: <WorkspacePremium />,   color: "#f59e0b", earned: true  },
  { name: "7-Day Streak",    desc: "Practice 7 days in a row",         icon: <LocalFireDepartment />, color: "#ef4444", earned: true  },
  { name: "Mock Master",     desc: "Complete 10 mock interviews",      icon: <MilitaryTech />,       color: "#6366f1", earned: false },
  { name: "Speed Demon",     desc: "Finish a quiz under 2 min",        icon: <Bolt />,               color: "#06b6d4", earned: true  },
  { name: "Interview Ready", desc: "Reach 90% readiness",              icon: <Verified />,           color: "#8b5cf6", earned: false },
  { name: "30-Day Streak",   desc: "Practice 30 days in a row",        icon: <LocalFireDepartment />, color: "#f97316", earned: false },
  { name: "Century Club",    desc: "Complete 100 quizzes",             icon: <EmojiEvents />,        color: "#ec4899", earned: false },
];

function levelFor(points: number) {
  return [...levels].reverse().find((l) => points >= l.min) ?? levels[0];
}

const metricLabel: Record<Metric, string> = {
  points: "Points",
  streak: "Streak (days)",
  quizzes: "Quizzes",
  interviews: "Interviews",
};

export default function LeaderboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [metric, setMetric] = useState<Metric>("points");
  const [scope, setScope] = useState<"global" | "friends" | "week">("global");

  const sorted = useMemo(
    () => [...rows].sort((a, b) => b[metric] - a[metric]).map((r, i) => ({ ...r, rank: i + 1 })),
    [metric],
  );

  const me = sorted.find((r) => r.name === user?.name) ?? sorted.find((r) => r.name === "Aarav Patel")!;
  const currentLevel = levelFor(me.points);
  const nextLevel = levels[Math.min(levels.findIndex((l) => l.name === currentLevel.name) + 1, levels.length - 1)];
  const toNext = Math.max(0, nextLevel.min - me.points);
  const progressPct = currentLevel === nextLevel ? 100 : Math.min(100, ((me.points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100);
  const earnedCount = achievements.filter((a) => a.earned).length;

  const top3 = sorted.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Leaderboard & Achievements
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Compete, earn badges, and level up your interview prep.
        </Typography>
      </Box>

      {/* Your stats */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: 0, color: "#fff", background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%)" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: { sm: "center" } }}>
                <Avatar sx={{ width: 72, height: 72, bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 28, fontWeight: 700 }}>
                  {me.name[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                    <Chip
                      label={currentLevel.name}
                      size="small"
                      icon={<WorkspacePremium sx={{ color: "#fff !important" }} />}
                      sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600 }}
                    />
                    <Chip label={`Rank #${me.rank}`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff" }} />
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{me.name}</Typography>
                  <Typography sx={{ opacity: 0.9, mb: 1.5 }}>
                    {me.points.toLocaleString()} pts · {me.streak}-day streak · {earnedCount}/{achievements.length} badges
                  </Typography>
                  <Box>
                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        {currentLevel === nextLevel ? "Max level reached" : `${toNext.toLocaleString()} pts to ${nextLevel.name}`}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9 }}>{Math.round(progressPct)}%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={progressPct}
                      sx={{ height: 8, borderRadius: 5, bgcolor: "rgba(255,255,255,0.2)", "& .MuiLinearProgress-bar": { bgcolor: "#fff" } }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">Level progression</Typography>
              <Stack spacing={1.5} sx={{ mt: 1 }}>
                {levels.map((l) => {
                  const reached = me.points >= l.min;
                  const isCurrent = l.name === currentLevel.name;
                  return (
                    <Stack key={l.name} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: reached ? `${l.color}22` : "action.hover", color: reached ? l.color : "text.disabled" }}>
                        {reached ? <WorkspacePremium fontSize="small" /> : <Lock fontSize="small" />}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                          <Typography variant="body2" sx={{ fontWeight: isCurrent ? 700 : 500, color: isCurrent ? l.color : "text.primary" }}>
                            {l.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{l.min.toLocaleString()}+ pts</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Achievements */}
      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" component="h2">Achievements</Typography>
              <Typography variant="caption" color="text.secondary">{earnedCount} of {achievements.length} unlocked</Typography>
            </Box>
            <Button size="small" endIcon={<ArrowForward />}>View all</Button>
          </Stack>
          <Grid container spacing={2}>
            {achievements.map((a) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={a.name}>
                <Tooltip title={a.earned ? "Earned" : "Locked — keep practicing!"}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2, textAlign: "center", height: "100%",
                      opacity: a.earned ? 1 : 0.55,
                      borderColor: a.earned ? `${a.color}55` : "divider",
                      transition: "transform .2s",
                      "&:hover": { transform: a.earned ? "translateY(-2px)" : "none" },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 52, height: 52, mx: "auto", mb: 1,
                        bgcolor: a.earned ? `${a.color}22` : "action.hover",
                        color: a.earned ? a.color : "text.disabled",
                      }}
                    >
                      {a.earned ? a.icon : <Lock />}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                      {a.desc}
                    </Typography>
                  </Card>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Podium */}
      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Top performers</Typography>
          <Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
            {podiumOrder.map((r) => {
              const height = r.rank === 1 ? 140 : r.rank === 2 ? 110 : 90;
              const medal = r.rank === 1 ? "#f59e0b" : r.rank === 2 ? "#94a3b8" : "#b45309";
              return (
                <Grid size={4} key={r.name}>
                  <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: r.avatarColor, fontWeight: 700 }}>{r.name[0]}</Avatar>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>{r.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{r.points.toLocaleString()} pts</Typography>
                    <Box
                      sx={{
                        width: "100%", height, borderRadius: 2,
                        background: `linear-gradient(180deg,${medal}44,${medal}22)`,
                        border: 1, borderColor: `${medal}66`,
                        display: "grid", placeItems: "center",
                      }}
                    >
                      <Stack sx={{ alignItems: "center" }}>
                        <EmojiEvents sx={{ color: medal, fontSize: r.rank === 1 ? 36 : 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: medal }}>#{r.rank}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Ranking table */}
      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2, justifyContent: "space-between", alignItems: { md: "center" } }}>
            <Typography variant="h6" component="h2">Global rankings</Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
              <Tabs value={scope} onChange={(_, v) => setScope(v)}>
                <Tab value="global" label="Global" />
                <Tab value="friends" label="Friends" />
                <Tab value="week" label="This week" />
              </Tabs>
            </Stack>
          </Stack>
          <Tabs
            value={metric}
            onChange={(_, v) => setMetric(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 1, borderBottom: 1, borderColor: "divider" }}
          >
            {(Object.keys(metricLabel) as Metric[]).map((m) => (
              <Tab key={m} value={m} label={`By ${metricLabel[m]}`} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 1 }} />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 60 }}>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Level</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Streak</TableCell>
                <TableCell align="right">Quizzes</TableCell>
                <TableCell align="right">Interviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((r) => {
                const isMe = r.name === me.name;
                const lvl = levelFor(r.points);
                return (
                  <TableRow
                    key={r.name}
                    sx={{
                      bgcolor: isMe ? "action.selected" : "transparent",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                        {r.rank <= 3 ? (
                          <EmojiEvents sx={{ fontSize: 18, color: r.rank === 1 ? "#f59e0b" : r.rank === 2 ? "#94a3b8" : "#b45309" }} />
                        ) : null}
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>#{r.rank}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: r.avatarColor, fontSize: 14, fontWeight: 700 }}>{r.name[0]}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: isMe ? 700 : 500 }}>
                            {r.name} {isMe && <Chip label="You" size="small" color="primary" sx={{ ml: 0.5, height: 18 }} />}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{r.country}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lvl.name}
                        size="small"
                        sx={{ bgcolor: `${lvl.color}22`, color: lvl.color, fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right"><strong>{r.points.toLocaleString()}</strong></TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                        <LocalFireDepartment sx={{ fontSize: 16, color: "#f97316" }} />
                        <span>{r.streak}</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{r.quizzes}</TableCell>
                    <TableCell align="right">{r.interviews}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: "center", color: "text.secondary" }}>
            <TrendingUp fontSize="small" />
            <Typography variant="caption">Rankings update every hour · {scope === "week" ? "This week" : scope === "friends" ? "Your friends only" : "All users"}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
