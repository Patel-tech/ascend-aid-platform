import {
  Card, CardContent, Typography, Stack, Box, Chip, Button, LinearProgress, Grid, Avatar, Tooltip,
} from "@mui/material";
import {
  AutoAwesome, TrendingDown, PlayArrow, Bolt, School, Timer, ArrowForward,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";

/**
 * AI-powered recommendation panel.
 * Shows a personalized "Recommended for you" hero card, weak-topics highlights,
 * and quick CTAs to start a targeted quiz / mock interview.
 */

const weakTopics = [
  { name: "DSA — Dynamic Programming", mastery: 32, urgency: "high", est: "20 min" },
  { name: "Microservices — Saga Pattern", mastery: 41, urgency: "high", est: "15 min" },
  { name: "SQL — Window Functions", mastery: 54, urgency: "medium", est: "12 min" },
  { name: "Spring Boot — Security", mastery: 61, urgency: "medium", est: "18 min" },
];

const urgencyColor = (u: string) =>
  u === "high" ? "#ef4444" : u === "medium" ? "#f59e0b" : "#10b981";

export default function Recommendations() {
  const top = weakTopics[0];

  return (
    <Card sx={{ border: 1, borderColor: "divider" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "#6366f122", color: "#6366f1", width: 40, height: 40 }}>
            <AutoAwesome />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              Recommended for you
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Personalized picks based on your recent performance
            </Typography>
          </Box>
          <Chip
            size="small"
            icon={<Bolt sx={{ fontSize: 14 }} />}
            label="AI"
            sx={{ bgcolor: "#6366f122", color: "#6366f1", fontWeight: 600 }}
          />
        </Stack>

        <Grid container spacing={2.5}>
          {/* Hero recommendation */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                color: "#fff",
                background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 55%,#ec4899 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Chip
                label="Top priority"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", alignSelf: "flex-start", mb: 1.5 }}
              />
              <Typography variant="overline" sx={{ opacity: 0.85 }}>
                Focus area
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {top.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                You scored below 40% on 3 recent attempts. A focused 20-minute quiz can lift this to
                60%+ before your next mock interview.
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    Current mastery
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {top.mastery}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={top.mastery}
                  sx={{
                    height: 6,
                    borderRadius: 5,
                    bgcolor: "rgba(255,255,255,0.2)",
                    "& .MuiLinearProgress-bar": { bgcolor: "#fff" },
                  }}
                />
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ mt: "auto", flexWrap: "wrap", gap: 1 }}>
                <Button
                  component={Link}
                  to="/quiz"
                  variant="contained"
                  startIcon={<PlayArrow />}
                  sx={{ bgcolor: "#fff", color: "#6366f1", "&:hover": { bgcolor: "#f1f5f9" } }}
                >
                  Start Quiz
                </Button>
                <Button
                  component={Link}
                  to="/study-plan"
                  variant="outlined"
                  sx={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
                >
                  Add to study plan
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Weak topics list */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
              <TrendingDown fontSize="small" sx={{ color: "#ef4444" }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Weak topics
              </Typography>
              <Chip label={weakTopics.length} size="small" sx={{ height: 20 }} />
            </Stack>

            <Stack spacing={1.25}>
              {weakTopics.map((t) => (
                <Tooltip key={t.name} title={`Practice ${t.name}`} placement="left">
                  <Card
                    component={Link}
                    to="/quiz"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      border: 1,
                      borderColor: "divider",
                      p: 1.5,
                      transition: "all .2s",
                      "&:hover": {
                        borderColor: urgencyColor(t.urgency),
                        transform: "translateX(2px)",
                        boxShadow: 2,
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 6,
                          alignSelf: "stretch",
                          borderRadius: 3,
                          bgcolor: urgencyColor(t.urgency),
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                          {t.name}
                        </Typography>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mt: 0.5 }}>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                            <School sx={{ fontSize: 12, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">
                              {t.mastery}%
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                            <Timer sx={{ fontSize: 12, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">
                              {t.est}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                      <ArrowForward sx={{ fontSize: 16, color: "text.secondary" }} />
                    </Stack>
                  </Card>
                </Tooltip>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
