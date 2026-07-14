import { useState, useRef, useEffect } from "react";
import {
  Box, Stack, Typography, IconButton, TextField, Button, Chip, Avatar, Tooltip, Divider,
  List, ListItemButton, ListItemText, Card, CircularProgress, Snackbar, Alert, LinearProgress,
} from "@mui/material";
import {
  Add, Send, ContentCopy, Refresh, SmartToy, Person, Description, DeleteOutlined, ArrowBack,
  Quiz as QuizIcon, AutoAwesome, TrendingUp, HelpOutlined as HelpOutline, ArrowForward, CheckCircle, Cancel,
  RecordVoiceOver, NoteAdd, Style as StyleIcon, PlayArrow, Stop, Timer,
} from "@mui/icons-material";
import { useRouter, Link } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  newConversation, setActive, sendMessage, receiveMessage, deleteConversation,
} from "@/store/chatSlice";

type Mode = "ask" | "explain" | "next" | "wrong" | "simulate";

const modes: { id: Mode; label: string; icon: React.ReactNode; color: string; hint: string }[] = [
  { id: "ask",      label: "Interview Q",     icon: <QuizIcon fontSize="small" />,       color: "#6366f1", hint: "Ask a common interview question" },
  { id: "explain",  label: "Explain topic",   icon: <AutoAwesome fontSize="small" />,    color: "#8b5cf6", hint: "Get a deep AI explanation" },
  { id: "next",     label: "Next topics",     icon: <TrendingUp fontSize="small" />,     color: "#10b981", hint: "Suggest what to study next" },
  { id: "wrong",    label: "Explain wrong Q", icon: <HelpOutline fontSize="small" />,    color: "#ef4444", hint: "Explain a quiz answer you missed" },
  { id: "simulate", label: "Interview sim",   icon: <RecordVoiceOver fontSize="small" />, color: "#f59e0b", hint: "Timed rapid-fire mock interview" },
];

const suggestions: Record<Mode, string[]> = {
  ask: [
    "Explain Java Memory Model",
    "What is CAP theorem?",
    "Difference between @Component and @Service",
    "Write SQL: 2nd highest salary",
  ],
  explain: [
    "Explain how HashMap works internally",
    "Walk me through Spring Boot auto-configuration",
    "Explain SOLID principles with examples",
  ],
  next: [
    "What should I learn after Spring Boot basics?",
    "Suggest topics based on my weak areas",
    "Give me a 3-day plan before my interview",
  ],
  wrong: [
    "Why is my answer to the DP quiz wrong?",
    "Explain the correct answer for the SQL window quiz",
    "Where did I go wrong on the microservices MCQ?",
  ],
  simulate: [
    "Start a 5-question Java interview",
    "Simulate a system design round",
    "Rapid-fire SQL round",
  ],
};

const recentWrongAnswers = [
  { topic: "DSA — DP", question: "Min coins to make amount N", yourAns: "Greedy", correct: "Bottom-up DP" },
  { topic: "SQL", question: "Nth highest salary using window fn", yourAns: "RANK()", correct: "DENSE_RANK()" },
  { topic: "Microservices", question: "Which pattern prevents cascading failures?", yourAns: "Retry", correct: "Circuit Breaker" },
];

const nextTopics = [
  { name: "Dynamic Programming", reason: "Weakest area — 32% mastery", to: "/quiz" },
  { name: "Saga Pattern",        reason: "Common in system design rounds", to: "/study-plan" },
  { name: "Window Functions",    reason: "Missed 2 SQL quizzes recently",  to: "/quiz" },
];

// Interview simulation bank
const simBank = [
  { q: "Explain the difference between HashMap and ConcurrentHashMap.", ideal: "Thread-safety, segment/bucket-level locking, null handling" },
  { q: "What is the CAP theorem? Give a real-world tradeoff example.", ideal: "Consistency, Availability, Partition tolerance — pick 2" },
  { q: "How does Spring Boot auto-configuration work under the hood?", ideal: "@EnableAutoConfiguration, spring.factories, @Conditional*" },
  { q: "Design a URL shortener. Walk me through your approach.", ideal: "Hashing, DB choice, cache, collision handling, scale" },
  { q: "Write a SQL query for the 2nd highest salary.", ideal: "DENSE_RANK() or subquery with MAX < MAX" },
];

// Follow-up chip generator
function followUps(mode: Mode): string[] {
  switch (mode) {
    case "explain":
      return ["Show a code example", "What's the time complexity?", "Common pitfalls interviewers ask"];
    case "wrong":
      return ["Show me a similar problem", "Give me a memory trick", "Practice 3 more like this"];
    case "next":
      return ["Build me a 7-day plan", "Which is highest priority?", "Link me a quiz for topic #1"];
    case "simulate":
      return ["Next question", "Give me a hint", "Show ideal answer"];
    default:
      return ["Explain in more detail", "Give a real-world example", "What follow-up would an interviewer ask?"];
  }
}

function mockReply(mode: Mode, prompt: string): { content: string; sources?: string[] } {
  switch (mode) {
    case "next":
      return {
        content:
          "Based on your recent activity, here's what I'd tackle next:\n\n" +
          "1. **Dynamic Programming** — you scored below 40% on 3 attempts. Start with 1D DP (coin change, house robber).\n" +
          "2. **Saga Pattern** — frequent in microservices interviews. Learn choreography vs orchestration.\n" +
          "3. **SQL Window Functions** — recent misses. Focus on RANK vs DENSE_RANK vs ROW_NUMBER.\n\n" +
          "Want me to add these to your study plan?",
        sources: ["progress-analytics", "study-plan.md"],
      };
    case "wrong":
      return {
        content:
          "Let's break down where the reasoning went off:\n\n" +
          "**Your answer:** Greedy approach\n" +
          "**Correct answer:** Bottom-up DP\n\n" +
          "Greedy works only when the coin system is *canonical* (e.g. {1,5,10,25}). For arbitrary denominations like {1,3,4} and amount 6, greedy picks 4+1+1 (3 coins) but the optimal is 3+3 (2 coins). Bottom-up DP explores every sub-amount, guaranteeing the true minimum.\n\n" +
          "**Remember:** whenever subproblems overlap and the greedy choice can be beaten by combining smaller solutions → use DP.",
        sources: ["quiz-attempt #47", "dsa-notes.pdf · p.31"],
      };
    case "explain":
      return {
        content:
          `Here's a structured explanation of "${prompt}":\n\n` +
          "1. **Core idea** — the underlying principle in one sentence.\n" +
          "2. **How it works** — step-by-step mechanism.\n" +
          "3. **Example** — a concrete case you can visualize.\n" +
          "4. **Interview follow-ups** — the 2–3 questions an interviewer will ask next.\n\n" +
          "Want me to go deeper on any section?",
        sources: ["interview-notes.pdf · p.12", "system-design.md"],
      };
    default:
      return {
        content:
          "Great question. Here's a structured answer:\n\n1. Define the concept clearly.\n2. Explain the underlying mechanism.\n3. Show a practical example.\n4. Mention common interview follow-ups.\n\nWould you like me to expand any section?",
        sources: ["interview-notes.pdf · p.12", "system-design.md"],
      };
  }
}


export default function AssistantPage() {
  const dispatch = useAppDispatch();
  const { conversations, activeId } = useAppSelector((s) => s.chat);
  const convo = conversations.find((c) => c.id === activeId);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [mode, setMode] = useState<Mode>("ask");
  const [toast, setToast] = useState<{ msg: string; sev: "success" | "info" } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Interview simulation state
  const [simRunning, setSimRunning] = useState(false);
  const [simIndex, setSimIndex] = useState(0);
  const [simScore, setSimScore] = useState(0);
  const [simTime, setSimTime] = useState(60);
  const simTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [convo?.messages.length, thinking]);

  // Sim timer
  useEffect(() => {
    if (!simRunning) return;
    simTimerRef.current = setInterval(() => {
      setSimTime((t) => {
        if (t <= 1) { nextSimQuestion(true); return 60; }
        return t - 1;
      });
    }, 1000);
    return () => { if (simTimerRef.current) clearInterval(simTimerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simRunning, simIndex]);

  function startSimulation() {
    setSimRunning(true);
    setSimIndex(0);
    setSimScore(0);
    setSimTime(60);
    dispatch(receiveMessage({
      id: `m${Date.now()}`,
      role: "assistant",
      content: `🎙️ **Mock interview started** — 5 questions, 60s each.\n\n**Q1.** ${simBank[0].q}`,
    }));
  }

  function stopSimulation() {
    setSimRunning(false);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    dispatch(receiveMessage({
      id: `m${Date.now()}`,
      role: "assistant",
      content: `🏁 **Interview ended.** Score: **${simScore} / ${simIndex}** answered.\n\nWant a detailed review of your answers?`,
    }));
  }

  function nextSimQuestion(timedOut = false) {
    const next = simIndex + 1;
    if (next >= simBank.length) {
      setSimRunning(false);
      if (simTimerRef.current) clearInterval(simTimerRef.current);
      dispatch(receiveMessage({
        id: `m${Date.now()}`,
        role: "assistant",
        content: `🏁 **All done!** Final score: **${simScore + (timedOut ? 0 : 1)} / ${simBank.length}**.\n\nStrong areas + weak areas incoming in your dashboard.`,
      }));
      return;
    }
    setSimIndex(next);
    setSimTime(60);
    dispatch(receiveMessage({
      id: `m${Date.now()}`,
      role: "assistant",
      content: `${timedOut ? "⏱️ Time's up!" : "✅ Recorded."} **Ideal:** ${simBank[simIndex].ideal}\n\n**Q${next + 1}.** ${simBank[next].q}`,
    }));
  }

  function handleSend(text?: string, forceMode?: Mode) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const activeMode = forceMode ?? mode;
    dispatch(sendMessage(msg));
    setInput("");

    // Simulation mode: grade & advance
    if (simRunning) {
      setSimScore((s) => s + 1);
      setTimeout(() => nextSimQuestion(false), 400);
      return;
    }

    setThinking(true);
    setTimeout(() => {
      const reply = mockReply(activeMode, msg);
      dispatch(
        receiveMessage({
          id: `m${Date.now()}`,
          role: "assistant",
          content: reply.content,
          sources: reply.sources,
        }),
      );
      setThinking(false);
    }, 1100);
  }

  function saveToNotes(content: string) {
    try {
      const key = "prepPilot.savedNotes";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
      prev.unshift({ id: Date.now(), content, savedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
      setToast({ msg: "Saved to Notes", sev: "success" });
    } catch { setToast({ msg: "Could not save", sev: "info" }); }
  }

  function saveAsFlashcard(content: string) {
    try {
      const key = "prepPilot.flashcards";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
      const firstLine = content.split("\n").find((l) => l.trim()) ?? "Card";
      prev.unshift({ id: Date.now(), q: firstLine.slice(0, 120), a: content, savedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
      setToast({ msg: "Saved as flashcard", sev: "success" });
    } catch { setToast({ msg: "Could not save", sev: "info" }); }
  }

  function copyText(content: string) {
    navigator.clipboard?.writeText(content).then(
      () => setToast({ msg: "Copied to clipboard", sev: "success" }),
      () => setToast({ msg: "Copy failed", sev: "info" }),
    );
  }


  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 130px)", gap: 2 }}>
      <Card sx={{ width: 280, display: { xs: "none", md: "flex" }, flexDirection: "column", border: 1, borderColor: "divider" }}>
        <Stack sx={{ p: 2 }} spacing={1}>
          <Button startIcon={<Add />} variant="contained" onClick={() => dispatch(newConversation())} fullWidth>
            New chat
          </Button>
        </Stack>
        <Divider />
        <List sx={{ flex: 1, overflowY: "auto", py: 0 }}>
          {conversations.map((c) => (
            <ListItemButton
              key={c.id}
              selected={c.id === activeId}
              onClick={() => dispatch(setActive(c.id))}
              sx={{ "&.Mui-selected": { bgcolor: "action.selected" } }}
            >
              <ListItemText
                primary={c.title}
                secondary={new Date(c.updatedAt).toLocaleDateString()}
                slotProps={{
                  primary: { sx: { fontSize: 14, fontWeight: 500 }, noWrap: true },
                  secondary: { sx: { fontSize: 11 } },
                }}
              />
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); dispatch(deleteConversation(c.id)); }}
                aria-label={`Delete conversation ${c.title}`}
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Card>

      <Card sx={{ flex: 1, display: "flex", flexDirection: "column", border: 1, borderColor: "divider" }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={() => router.history.back()}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {convo?.title ?? "New chat"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {modes.find((m) => m.id === mode)?.hint}
            </Typography>
          </Box>
          {simRunning && (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "#f59e0b22", px: 1.5, py: 0.5, borderRadius: 2 }}>
              <Timer sx={{ fontSize: 18, color: "#f59e0b" }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#f59e0b", minWidth: 30 }}>{simTime}s</Typography>
              <Typography variant="caption" color="text.secondary">Q{simIndex + 1}/{simBank.length} · Score {simScore}</Typography>
              <Button size="small" color="error" startIcon={<Stop />} onClick={stopSimulation}>End</Button>
            </Stack>
          )}
        </Box>

        {/* Mode selector */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider", display: "flex", gap: 1, flexWrap: "wrap" }}>
          {modes.map((m) => {
            const active = m.id === mode;
            return (
              <Tooltip key={m.id} title={m.hint}>
                <Chip
                  icon={m.icon as React.ReactElement}
                  label={m.label}
                  onClick={() => setMode(m.id)}
                  clickable
                  sx={{
                    fontWeight: 600,
                    border: 1,
                    borderColor: active ? m.color : "divider",
                    bgcolor: active ? `${m.color}22` : "transparent",
                    color: active ? m.color : "text.primary",
                    "& .MuiChip-icon": { color: active ? m.color : "text.secondary" },
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>

        {simRunning && (
          <LinearProgress
            variant="determinate"
            value={(simTime / 60) * 100}
            sx={{ height: 3, "& .MuiLinearProgress-bar": { bgcolor: simTime < 15 ? "#ef4444" : "#f59e0b" } }}
          />
        )}

        <Box ref={scrollRef} sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
          {!convo?.messages.length && (
            <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center", mt: 4 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
                <SmartToy fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>How can I help you prep today?</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {mode === "next" && "I'll suggest what to study next based on your progress."}
                  {mode === "wrong" && "Pick a recent wrong answer or ask about any missed question."}
                  {mode === "ask" && "Ask any interview question — Java, Spring, SQL, DSA, system design."}
                  {mode === "explain" && "I'll give a structured explanation with examples & follow-ups."}
                  {mode === "simulate" && "Timed rapid-fire mock interview — 5 questions, 60 seconds each."}
                </Typography>
              </Box>

              {mode === "simulate" && !simRunning && (
                <Card sx={{ p: 3, maxWidth: 480, border: 1, borderColor: "#f59e0b", bgcolor: "#f59e0b11" }}>
                  <Stack spacing={2} sx={{ alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "#f59e0b", width: 48, height: 48 }}><RecordVoiceOver /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Mock Interview Round</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                      5 questions · 60 seconds each · Mixed topics (Java, System Design, SQL). Type your answer and hit Send to lock it in.
                    </Typography>
                    <Button variant="contained" size="large" startIcon={<PlayArrow />} onClick={startSimulation}
                      sx={{ bgcolor: "#f59e0b", "&:hover": { bgcolor: "#d97706" } }}>
                      Start interview
                    </Button>
                  </Stack>
                </Card>
              )}

              {mode === "wrong" && (
                <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 560, textAlign: "left" }}>
                  <Typography variant="overline" color="text.secondary">Recent incorrect answers</Typography>
                  {recentWrongAnswers.map((w) => (
                    <Card
                      key={w.question}
                      onClick={() => handleSend(`Explain why my answer to "${w.question}" was wrong.`, "wrong")}
                      sx={{
                        p: 1.5, border: 1, borderColor: "divider", cursor: "pointer",
                        "&:hover": { borderColor: "#ef4444", boxShadow: 2 },
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                        <Chip label={w.topic} size="small" sx={{ height: 20, fontSize: 11 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }} noWrap>{w.question}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center", pl: 0.5 }}>
                        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                          <Cancel sx={{ fontSize: 14, color: "#ef4444" }} />
                          <Typography variant="caption" color="text.secondary">You: {w.yourAns}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                          <CheckCircle sx={{ fontSize: 14, color: "#10b981" }} />
                          <Typography variant="caption" color="text.secondary">Correct: {w.correct}</Typography>
                        </Stack>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}

              {mode === "next" && (
                <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 560, textAlign: "left" }}>
                  <Typography variant="overline" color="text.secondary">Suggested next topics</Typography>
                  {nextTopics.map((t) => (
                    <Card key={t.name} sx={{ p: 1.5, border: 1, borderColor: "divider" }}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#10b98122", color: "#10b981", width: 32, height: 32 }}>
                          <TrendingUp fontSize="small" />
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{t.reason}</Typography>
                        </Box>
                        <Button component={Link} to={t.to} size="small" endIcon={<ArrowForward />}>
                          Start
                        </Button>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}

              {mode !== "simulate" && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                  {suggestions[mode].map((s) => (
                    <Chip key={s} label={s} onClick={() => handleSend(s)} clickable variant="outlined" />
                  ))}
                </Stack>
              )}
            </Stack>
          )}


          <Stack spacing={3}>
            {convo?.messages.map((m, idx) => {
              const isLastAssistant = m.role === "assistant" && idx === (convo?.messages.length ?? 0) - 1;
              return (
                <Stack key={m.id} direction="row" spacing={2}>
                  <Avatar sx={{ bgcolor: m.role === "user" ? "secondary.main" : "primary.main" }}>
                    {m.role === "user" ? <Person /> : <SmartToy />}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      {m.role === "user" ? "You" : "PrepPilot AI"}
                    </Typography>
                    <Box
                      sx={{
                        mt: 0.5, p: 2, borderRadius: 2,
                        bgcolor: m.role === "user" ? "action.hover" : "transparent",
                        border: m.role === "assistant" ? 1 : 0,
                        borderColor: "divider",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <Typography variant="body2">{m.content}</Typography>
                      {m.sources && (
                        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
                          {m.sources.map((s) => (
                            <Chip key={s} icon={<Description sx={{ fontSize: 14 }} />} label={s} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      )}
                      {m.role === "assistant" && (
                        <>
                          <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: "wrap" }}>
                            <Tooltip title="Copy">
                              <IconButton size="small" aria-label="Copy response" onClick={() => copyText(m.content)}>
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Regenerate">
                              <IconButton size="small" aria-label="Regenerate response"><Refresh fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Save to Notes">
                              <IconButton size="small" aria-label="Save to notes" onClick={() => saveToNotes(m.content)}>
                                <NoteAdd fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Save as Flashcard">
                              <IconButton size="small" aria-label="Save as flashcard" onClick={() => saveAsFlashcard(m.content)}>
                                <StyleIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>

                          {/* Follow-up chips on the latest assistant message */}
                          {isLastAssistant && !simRunning && (
                            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ width: "100%", mb: 0.5 }}>
                                Suggested follow-ups
                              </Typography>
                              {followUps(mode).map((f) => (
                                <Chip
                                  key={f}
                                  label={f}
                                  size="small"
                                  clickable
                                  onClick={() => handleSend(f)}
                                  sx={{ bgcolor: "action.hover", "&:hover": { bgcolor: "primary.main", color: "primary.contrastText" } }}
                                />
                              ))}
                            </Stack>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Stack>
              );
            })}
            {thinking && (
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "primary.main" }}><SmartToy /></Avatar>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <CircularProgress size={14} />
                  <Typography variant="body2" color="text.secondary">Thinking…</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth multiline maxRows={5}
              placeholder={simRunning ? "Type your answer and press Enter…" : "Ask anything…"}
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
              }}
              size="small"
            />
            <Button
              variant="contained"
              endIcon={simRunning ? <ArrowForward /> : <Send />}
              onClick={() => handleSend()}
              disabled={!input.trim()}
              sx={simRunning ? { bgcolor: "#f59e0b", "&:hover": { bgcolor: "#d97706" } } : undefined}
            >
              {simRunning ? "Submit" : "Send"}
            </Button>
          </Stack>
        </Box>
      </Card>

      <Snackbar
        open={!!toast}
        autoHideDuration={2200}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? <Alert severity={toast.sev} onClose={() => setToast(null)}>{toast.msg}</Alert> : undefined}
      </Snackbar>
    </Box>
  );
}
