import { useState } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, LinearProgress, Chip, RadioGroup,
  FormControlLabel, Radio, Avatar,
} from "@mui/material";
import { Timer, CheckCircle, Cancel, EmojiEvents } from "@mui/icons-material";

const quiz = [
  {
    q: "Which scope makes a Spring bean unique to each HTTP request?",
    options: ["singleton", "prototype", "request", "session"],
    answer: 2,
    explain: "@RequestScope (request) creates one bean per HTTP request lifecycle.",
  },
  {
    q: "Which is NOT a feature of Spring Boot Actuator?",
    options: ["Health checks", "Metrics endpoints", "Dependency injection", "Audit events"],
    answer: 2,
    explain: "Dependency injection is core Spring, not Actuator.",
  },
  {
    q: "In SQL, which join returns unmatched rows from both tables?",
    options: ["INNER", "LEFT", "RIGHT", "FULL OUTER"],
    answer: 3,
    explain: "FULL OUTER JOIN returns all rows from both with NULLs where missing.",
  },
];

export default function QuizPage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const current = quiz[idx];
  const score = answers.filter((a, i) => a === quiz[i].answer).length;

  if (done) {
    return (
      <Stack spacing={3}>
        <Card sx={{ border: 1, borderColor: "divider", textAlign: "center", p: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", mx: "auto", mb: 2 }}>
            <EmojiEvents fontSize="large" />
          </Avatar>
          <Typography variant="h4">{score} / {quiz.length}</Typography>
          <Typography color="text.secondary">Great work! Review the explanations below.</Typography>
        </Card>
        {quiz.map((q, i) => {
          const correct = answers[i] === q.answer;
          return (
            <Card key={i} sx={{ border: 1, borderColor: "divider" }}>
              <CardContent>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                  {correct ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{q.q}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Correct answer: <b>{q.options[q.answer]}</b>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{q.explain}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
        <Button variant="contained" onClick={() => { setIdx(0); setSelected(null); setAnswers([]); setDone(false); }}>
          Restart quiz
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Quiz</Typography>
        <Stack direction="row" spacing={1}>
          <Chip icon={<Timer />} label="14:32" />
          <Chip label={`Score: ${score}`} color="primary" />
        </Stack>
      </Stack>
      <LinearProgress variant="determinate" value={(idx / quiz.length) * 100} sx={{ height: 6, borderRadius: 3 }} />

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">Question {idx + 1} of {quiz.length}</Typography>
          <Typography variant="h6" sx={{ mt: 1, mb: 3 }}>{current.q}</Typography>
          <RadioGroup value={selected ?? -1} onChange={(e) => setSelected(Number(e.target.value))}>
            {current.options.map((opt, i) => (
              <FormControlLabel
                key={i} value={i}
                control={<Radio />} label={opt}
                sx={{
                  border: 1, borderColor: selected === i ? "primary.main" : "divider",
                  borderRadius: 2, m: 0, mb: 1, px: 1.5, py: 0.5,
                }}
              />
            ))}
          </RadioGroup>
          <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained" disabled={selected === null}
              onClick={() => {
                const next = [...answers, selected!];
                setAnswers(next);
                setSelected(null);
                if (idx + 1 >= quiz.length) setDone(true);
                else setIdx(idx + 1);
              }}
            >
              {idx + 1 >= quiz.length ? "Submit quiz" : "Next"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
