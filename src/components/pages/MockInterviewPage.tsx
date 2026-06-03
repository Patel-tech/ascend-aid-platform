import { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, Chip, LinearProgress, TextField, Grid, Avatar,
} from "@mui/material";
import { PlayArrow, Stop, Timer, RecordVoiceOver, CheckCircle } from "@mui/icons-material";

const techs = ["Java", "Spring Boot", "Hibernate", "Microservices", "SQL", "DSA"];

const questions = [
  "Explain the difference between @Component, @Service, and @Repository.",
  "How does Spring Boot's embedded Tomcat startup work?",
  "Walk me through designing a rate limiter.",
  "What's the difference between optimistic and pessimistic locking?",
  "Describe the Saga pattern in microservices.",
];

export default function MockInterviewPage() {
  const [started, setStarted] = useState(false);
  const [tech, setTech] = useState("Spring Boot");
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || done) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, done]);

  if (done) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4">Evaluation report</Typography>
        <Card sx={{ border: 1, borderColor: "divider" }}>
          <CardContent>
            <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
              <Avatar sx={{ width: 88, height: 88, bgcolor: "success.main", fontSize: 32, fontWeight: 700 }}>82</Avatar>
              <Box>
                <Typography variant="h5">Strong performance</Typography>
                <Typography color="text.secondary">
                  You answered {questions.length} questions in {Math.floor(elapsed / 60)}m {elapsed % 60}s.
                </Typography>
              </Box>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {[
                { label: "Technical depth", v: 88 },
                { label: "Clarity", v: 76 },
                { label: "Structure", v: 84 },
                { label: "Confidence", v: 80 },
              ].map((m) => (
                <Grid size={{ xs: 12, sm: 6 }} key={m.label}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2">{m.label}</Typography>
                    <Typography variant="body2" color="text.secondary">{m.v}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={m.v} sx={{ height: 6, borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Button variant="contained" onClick={() => { setDone(false); setStarted(false); setQIdx(0); setElapsed(0); setAnswer(""); }}>
          Start a new interview
        </Button>
      </Stack>
    );
  }

  if (!started) {
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4">Mock Interview</Typography>
          <Typography color="text.secondary">AI asks role-specific questions and evaluates your answers.</Typography>
        </Box>
        <Card sx={{ border: 1, borderColor: "divider" }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Choose a technology</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 3 }}>
              {techs.map((t) => (
                <Chip
                  key={t} label={t} clickable
                  color={tech === t ? "primary" : "default"}
                  variant={tech === t ? "filled" : "outlined"}
                  onClick={() => setTech(t)}
                />
              ))}
            </Stack>
            <Button variant="contained" size="large" startIcon={<PlayArrow />} onClick={() => setStarted(true)}>
              Start {tech} interview
            </Button>
          </CardContent>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="overline" color="text.secondary">{tech} interview</Typography>
          <Typography variant="h5">Question {qIdx + 1} of {questions.length}</Typography>
        </Box>
        <Chip icon={<Timer />} label={`${Math.floor(elapsed/60).toString().padStart(2,"0")}:${(elapsed%60).toString().padStart(2,"0")}`} color="primary" />
      </Stack>
      <LinearProgress variant="determinate" value={((qIdx) / questions.length) * 100} sx={{ height: 6, borderRadius: 3 }} />

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
            <Avatar sx={{ bgcolor: "primary.main" }}><RecordVoiceOver /></Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary">Interviewer</Typography>
              <Typography variant="h6" sx={{ mt: 0.5 }}>{questions[qIdx]}</Typography>
            </Box>
          </Stack>
          <TextField
            multiline minRows={6} fullWidth placeholder="Type your answer…"
            sx={{ mt: 3 }} value={answer} onChange={(e) => setAnswer(e.target.value)}
          />
          <Stack direction="row" spacing={1.5} sx={{ mt: 2, justifyContent: "flex-end" }}>
            <Button startIcon={<Stop />} color="error" onClick={() => setDone(true)}>End interview</Button>
            <Button
              variant="contained" endIcon={<CheckCircle />}
              onClick={() => {
                if (qIdx + 1 >= questions.length) setDone(true);
                else { setQIdx(qIdx + 1); setAnswer(""); }
              }}
            >
              {qIdx + 1 >= questions.length ? "Finish" : "Next question"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
