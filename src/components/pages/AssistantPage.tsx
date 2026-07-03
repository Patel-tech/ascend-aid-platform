import { useState, useRef, useEffect } from "react";
import {
  Box, Stack, Typography, IconButton, TextField, Button, Chip, Avatar, Tooltip, Divider,
  List, ListItemButton, ListItemText, Card, CircularProgress,
} from "@mui/material";
import {
  Add, Send, ContentCopy, Refresh, SmartToy, Person, Description, DeleteOutlined, ArrowBack,
  Quiz as QuizIcon, AutoAwesome, TrendingUp, HelpOutlined as HelpOutline, ArrowForward, CheckCircle, Cancel,
} from "@mui/icons-material";
import { useRouter, Link } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  newConversation, setActive, sendMessage, receiveMessage, deleteConversation,
} from "@/store/chatSlice";

type Mode = "ask" | "explain" | "next" | "wrong";

const modes: { id: Mode; label: string; icon: React.ReactNode; color: string; hint: string }[] = [
  { id: "ask",     label: "Interview Q",     icon: <QuizIcon fontSize="small" />,     color: "#6366f1", hint: "Ask a common interview question" },
  { id: "explain", label: "Explain topic",   icon: <AutoAwesome fontSize="small" />,  color: "#8b5cf6", hint: "Get a deep AI explanation" },
  { id: "next",    label: "Next topics",     icon: <TrendingUp fontSize="small" />,   color: "#10b981", hint: "Suggest what to study next" },
  { id: "wrong",   label: "Explain wrong Q", icon: <HelpOutline fontSize="small" />,  color: "#ef4444", hint: "Explain a quiz answer you missed" },
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [convo?.messages.length, thinking]);

  function handleSend(text?: string, forceMode?: Mode) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const activeMode = forceMode ?? mode;
    dispatch(sendMessage(msg));
    setInput("");
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
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {convo?.title ?? "New chat"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {modes.find((m) => m.id === mode)?.hint}
            </Typography>
          </Box>
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
                </Typography>
              </Box>

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

              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                {suggestions[mode].map((s) => (
                  <Chip key={s} label={s} onClick={() => handleSend(s)} clickable variant="outlined" />
                ))}
              </Stack>
            </Stack>
          )}


          <Stack spacing={3}>
            {convo?.messages.map((m) => (
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
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                        <Tooltip title="Copy"><IconButton size="small" aria-label="Copy response"><ContentCopy fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Regenerate"><IconButton size="small" aria-label="Regenerate response"><Refresh fontSize="small" /></IconButton></Tooltip>
                      </Stack>
                    )}
                  </Box>
                </Box>
              </Stack>
            ))}
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
              fullWidth multiline maxRows={5} placeholder="Ask anything…"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
              }}
              size="small"
            />
            <Button variant="contained" endIcon={<Send />} onClick={() => handleSend()} disabled={!input.trim()}>
              Send
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
