import { useState } from "react";
import { Box, Card, Stack, Typography, IconButton, Button, Chip, LinearProgress } from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const cards = [
  { q: "What is the difference between HashMap and ConcurrentHashMap?", a: "ConcurrentHashMap is thread-safe with finer-grained locking (bucket/segment level), allows concurrent reads, and disallows null keys/values." },
  { q: "Explain SOLID — the L principle.", a: "Liskov Substitution: subtypes must be substitutable for their base types without breaking program correctness." },
  { q: "What is idempotency in REST?", a: "An operation is idempotent if performing it multiple times yields the same result. PUT and DELETE are idempotent; POST typically isn't." },
];

export default function FlashcardsPage() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<number>>(new Set());
  const c = cards[i];
  const router = useRouter();

  return (
    <Stack spacing={3} sx={{ maxWidth: 720, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box>
            <Typography variant="h4">Flashcards</Typography>
            <Typography color="text.secondary">Tap the card to flip · {learned.size} / {cards.length} learned</Typography>
          </Box>
        </Box>
      </Box>
      <LinearProgress variant="determinate" value={(learned.size / cards.length) * 100} sx={{ height: 6, borderRadius: 3 }} />

      <Box sx={{ perspective: 1200, height: 320 }}>
        <Card
          onClick={() => setFlipped((f) => !f)}
          sx={{
            height: "100%", cursor: "pointer", position: "relative",
            transition: "transform .6s", transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "none",
            border: 1, borderColor: "divider",
          }}
        >
          {[false, true].map((back) => (
            <Box
              key={String(back)}
              sx={{
                position: "absolute", inset: 0, display: "grid", placeItems: "center", p: 4,
                backfaceVisibility: "hidden",
                transform: back ? "rotateY(180deg)" : "none",
                background: back ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "transparent",
                color: back ? "#fff" : "text.primary",
                textAlign: "center",
              }}
            >
              <Box>
                <Chip label={back ? "Answer" : "Question"} size="small" sx={{ mb: 2, color: back ? "#fff" : undefined, bgcolor: back ? "rgba(255,255,255,0.2)" : undefined }} />
                <Typography variant="h6" sx={{ lineHeight: 1.5 }}>{back ? c.a : c.q}</Typography>
              </Box>
            </Box>
          ))}
        </Card>
      </Box>

      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <IconButton onClick={() => { setFlipped(false); setI((i - 1 + cards.length) % cards.length); }}>
          <ArrowBack />
        </IconButton>
        <Button
          variant="contained" startIcon={<CheckCircle />}
          color={learned.has(i) ? "success" : "primary"}
          onClick={() => { const s = new Set(learned); s.has(i) ? s.delete(i) : s.add(i); setLearned(s); }}
        >
          {learned.has(i) ? "Learned" : "Mark as learned"}
        </Button>
        <IconButton onClick={() => { setFlipped(false); setI((i + 1) % cards.length); }}>
          <ArrowForward />
        </IconButton>
      </Stack>
    </Stack>
  );
}
