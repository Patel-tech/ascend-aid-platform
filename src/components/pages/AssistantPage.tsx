import { useState, useRef, useEffect } from "react";
import {
  Box, Stack, Typography, IconButton, TextField, Button, Chip, Avatar, Tooltip, Divider,
  List, ListItemButton, ListItemText, Card, CircularProgress,
} from "@mui/material";
import {
  Add, Send, ContentCopy, Refresh, SmartToy, Person, Description, DeleteOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  newConversation, setActive, sendMessage, receiveMessage, deleteConversation,
} from "@/store/chatSlice";

const suggestions = [
  "Explain Java Memory Model",
  "What is CAP theorem?",
  "Difference between @Component and @Service",
  "Write SQL: 2nd highest salary",
];

export default function AssistantPage() {
  const dispatch = useAppDispatch();
  const { conversations, activeId } = useAppSelector((s) => s.chat);
  const convo = conversations.find((c) => c.id === activeId);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [convo?.messages.length, thinking]);

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    dispatch(sendMessage(msg));
    setInput("");
    setThinking(true);
    setTimeout(() => {
      dispatch(
        receiveMessage({
          id: `m${Date.now()}`,
          role: "assistant",
          content:
            "Great question. Here's a structured answer:\n\n1. Define the concept clearly.\n2. Explain the underlying mechanism.\n3. Show a practical example.\n4. Mention common interview follow-ups.\n\nWould you like me to expand any section?",
          sources: ["interview-notes.pdf · p.12", "system-design.md"],
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
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Card>

      <Card sx={{ flex: 1, display: "flex", flexDirection: "column", border: 1, borderColor: "divider" }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {convo?.title ?? "New chat"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by RAG over your uploaded documents
          </Typography>
        </Box>

        <Box ref={scrollRef} sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
          {!convo?.messages.length && (
            <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center", mt: 6 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
                <SmartToy fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>How can I help you prep today?</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Ask anything about Java, Spring, SQL, DSA or system design.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                {suggestions.map((s) => (
                  <Chip key={s} label={s} onClick={() => handleSend(s)} clickable />
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
                        <Tooltip title="Copy"><IconButton size="small"><ContentCopy fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Regenerate"><IconButton size="small"><Refresh fontSize="small" /></IconButton></Tooltip>
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
