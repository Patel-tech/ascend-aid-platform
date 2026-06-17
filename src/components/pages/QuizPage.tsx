import { useState, useEffect, useMemo } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, LinearProgress, Chip, RadioGroup,
  FormControlLabel, Radio, Avatar, IconButton, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Tooltip, InputAdornment,
} from "@mui/material";
import { Timer, CheckCircle, Cancel, EmojiEvents, ArrowBack, ChevronLeft, ChevronRight, Home, PlayArrow, Search } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

type Difficulty = "Easy" | "Medium" | "Hard";
const topics: { name: string; difficulty: Difficulty; minutes: number; updated: string }[] = [
  { name: "Java",           difficulty: "Easy",   minutes: 10, updated: "2026-06-10" },
  { name: "Spring Boot",    difficulty: "Medium", minutes: 15, updated: "2026-06-14" },
  { name: "Hibernate",      difficulty: "Medium", minutes: 12, updated: "2026-05-28" },
  { name: "SQL",            difficulty: "Easy",   minutes: 10, updated: "2026-06-12" },
  { name: "DSA",            difficulty: "Hard",   minutes: 25, updated: "2026-06-16" },
  { name: "System Design",  difficulty: "Hard",   minutes: 30, updated: "2026-06-15" },
  { name: "Microservices",  difficulty: "Medium", minutes: 20, updated: "2026-06-09" },
];

type SortKey = "name" | "difficulty" | "minutes" | "updated";
const difficultyRank: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };
const difficultyColor: Record<Difficulty, "success" | "warning" | "error"> = {
  Easy: "success", Medium: "warning", Hard: "error",
};

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
  const [wantAnotherQuiz, setWantAnotherQuiz] = useState(false);
  const [nextQuizMode, setNextQuizMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [topicQuery, setTopicQuery] = useState("");
  const [topicDifficulty, setTopicDifficulty] = useState<"All" | Difficulty>("All");
  const [topicSort, setTopicSort] = useState<SortKey>("name");
  const router = useRouter();

  const filteredTopics = useMemo(() => {
    let list = topics.filter((t) =>
      t.name.toLowerCase().includes(topicQuery.toLowerCase()) &&
      (topicDifficulty === "All" || t.difficulty === topicDifficulty),
    );
    list = [...list].sort((a, b) => {
      switch (topicSort) {
        case "difficulty": return difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
        case "minutes":    return a.minutes - b.minutes;
        case "updated":    return b.updated.localeCompare(a.updated);
        default:           return a.name.localeCompare(b.name);
      }
    });
    return list;
  }, [topicQuery, topicDifficulty, topicSort]);

  const current = quiz[idx];
  const score = answers.filter((a, i) => a === quiz[i].answer).length;

  // Timer countdown effect
  useEffect(() => {
    if (done || !current) return; // Don't run timer when quiz is done

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setDone(true); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [done, current]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update selected answer when navigating to a different question
  useEffect(() => {
    if (idx < answers.length) {
      // If this question has already been answered, show the previous answer
      setSelected(answers[idx]);
    } else {
      // If this is a new unanswered question, clear the selection
      setSelected(null);
    }
  }, [idx, answers]);

  if (done) {
    if (wantAnotherQuiz) {
      return (
        <Stack spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => {
                setWantAnotherQuiz(false);
                setNextQuizMode(false);
              }} 
              sx={{ mr: 1 }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography variant="h4">Select a Topic</Typography>
          </Box>
          <Typography color="text.secondary">Choose a topic for your next quiz to keep the momentum going! 🚀</Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              size="small"
              placeholder="Search topics…"
              value={topicQuery}
              onChange={(e) => setTopicQuery(e.target.value)}
              aria-label="Search topics"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
                  ),
                },
              }}
              sx={{ flex: 1 }}
            />
            <Tooltip title="Filter by difficulty level">
              <TextField
                select size="small" label="Difficulty"
                value={topicDifficulty}
                onChange={(e) => setTopicDifficulty(e.target.value as "All" | Difficulty)}
                sx={{ minWidth: 140 }}
              >
                {["All", "Easy", "Medium", "Hard"].map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>
            </Tooltip>
            <Tooltip title="Sort topics">
              <TextField
                select size="small" label="Sort by"
                value={topicSort}
                onChange={(e) => setTopicSort(e.target.value as SortKey)}
                sx={{ minWidth: 170 }}
              >
                <MenuItem value="name">Name (A–Z)</MenuItem>
                <MenuItem value="difficulty">Difficulty</MenuItem>
                <MenuItem value="minutes">Completion time</MenuItem>
                <MenuItem value="updated">Recently updated</MenuItem>
              </TextField>
            </Tooltip>
          </Stack>

          <Grid container spacing={2}>
            {filteredTopics.map((topic) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={topic.name}>
                <Tooltip title={`${topic.difficulty} · ~${topic.minutes} min`}>
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-label={`Start ${topic.name} quiz, ${topic.difficulty}, about ${topic.minutes} minutes`}
                    onClick={() => {
                      setIdx(0);
                      setSelected(null);
                      setAnswers([]);
                      setDone(false);
                      setWantAnotherQuiz(false);
                      setNextQuizMode(true);
                      setTimeLeft(15 * 60);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        (e.currentTarget as HTMLElement).click();
                      }
                    }}
                    sx={{
                      cursor: "pointer", border: 1, borderColor: "divider", p: 2.5, textAlign: "center",
                      transition: "all .2s",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 3, borderColor: "primary.main" },
                      "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", mx: "auto", mb: 1.5 }}>
                        <PlayArrow />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {topic.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: "center", mt: 1 }}>
                        <Chip size="small" label={topic.difficulty} color={difficultyColor[topic.difficulty]} variant="outlined" />
                        <Chip size="small" icon={<Timer sx={{ fontSize: 14 }} />} label={`${topic.minutes}m`} variant="outlined" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="outlined" startIcon={<Home />} 
            onClick={() => {
              setNextQuizMode(false);
              router.navigate({ to: "/dashboard" });
            }}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Stack>
      );
    }

    return (
      <Stack spacing={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => {
              setNextQuizMode(false);
              router.history.back();
            }} 
            sx={{ mr: 1 }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="h4">Quiz Results</Typography>
        </Box>
        <Card sx={{ border: 1, borderColor: "divider", textAlign: "center", p: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                <EmojiEvents fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4">{score} / {quiz.length}</Typography>
                <Typography color="text.secondary">Great work! Review the explanations below.</Typography>
              </Box>
            </Stack>
          </CardContent>
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
        <Divider sx={{ my: 1 }} />
        <Card sx={{ border: 1, borderColor: "primary.main", bgcolor: "primary.main", color: "#fff" }}>
          <CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Ready for more?</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Practice another topic to boost your skills 🚀
                </Typography>
              </Box>
              <Button
                variant="contained" sx={{ bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#f1f5f9" } }}
                endIcon={<ChevronRight />}
                onClick={() => {
                  setWantAnotherQuiz(true);
                  setNextQuizMode(false);
                }}
              >
                Next Quiz
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined" 
            onClick={() => { 
              setIdx(0); 
              setSelected(null); 
              setAnswers([]); 
              setDone(false);
              setTimeLeft(15 * 60);
              setNextQuizMode(false);
            }}
            sx={{ flex: 1 }}
          >
            Restart Quiz
          </Button>
          <Button
            variant="contained" startIcon={<Home />} 
            onClick={() => {
              setNextQuizMode(false);
              router.navigate({ to: "/dashboard" });
            }}
            sx={{ flex: 1 }}
          >
            Go Home
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => {
              if (nextQuizMode) {
                // Show confirmation dialog before going back
                setShowBackConfirm(true);
              } else {
                // Go back using router history
                router.history.back();
              }
            }} 
            sx={{ mr: 1 }}
            title={nextQuizMode ? "Back to topic selection" : "Go back"}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="h4">Quiz</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip icon={<Timer />} label={formatTime(timeLeft)} color={timeLeft < 60 ? "error" : "default"} />
          <Chip label={`Score: ${score}`} color="primary" />
        </Stack>
      </Box>
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
          <Stack direction="row" sx={{ justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined" startIcon={<ChevronLeft />}
              disabled={idx === 0}
              onClick={() => {
                setIdx(idx - 1);
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained" endIcon={<ChevronRight />}
              disabled={selected === null}
              onClick={() => {
                if (idx < answers.length) {
                  // Update existing answer
                  const updated = [...answers];
                  updated[idx] = selected!;
                  setAnswers(updated);
                } else {
                  // Add new answer
                  const next = [...answers, selected!];
                  setAnswers(next);
                }
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

      {/* Confirmation Dialog for Back Button */}
      <Dialog open={showBackConfirm} onClose={() => setShowBackConfirm(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Leave Quiz?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to go back to topic selection? Your current progress will be lost.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowBackConfirm(false)} variant="outlined">
            No, Continue
          </Button>
          <Button
            onClick={() => {
              setShowBackConfirm(false);
              setDone(true);
              setWantAnotherQuiz(true);
              setNextQuizMode(false);
            }}
            variant="contained"
            color="error"
          >
            Yes, Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
