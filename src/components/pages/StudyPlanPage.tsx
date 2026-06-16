import { useState } from "react";
import {
  Box, Card, CardContent, Stack, Typography, Button, Grid, TextField, Chip, LinearProgress, Avatar, IconButton, Checkbox,
} from "@mui/material";
import { AutoAwesome, CheckCircleOutlined, ArrowBack, School } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const weeks = [
  { w: "Week 1", focus: "Java Core + OOP deep dive", pct: 100 },
  { w: "Week 2", focus: "Spring Boot & Spring Data", pct: 80 },
  { w: "Week 3", focus: "Microservices patterns", pct: 45 },
  { w: "Week 4", focus: "SQL + System Design", pct: 10 },
  { w: "Week 5", focus: "Mock interviews & polish", pct: 0 },
];

const topicsByWeek: { [key: string]: Array<{ topic: string; completed: boolean }> } = {
  "Week 1": [
    { topic: "Java fundamentals - variables, data types", completed: true },
    { topic: "Object-Oriented Programming - classes & objects", completed: true },
    { topic: "Inheritance, Polymorphism & Encapsulation", completed: true },
    { topic: "Abstract classes & interfaces", completed: true },
    { topic: "Exception handling & Java collections", completed: false },
  ],
  "Week 2": [
    { topic: "Spring Boot basics - annotations & auto-config", completed: true },
    { topic: "Spring Data JPA - repositories & queries", completed: true },
    { topic: "REST APIs with Spring Boot", completed: false },
    { topic: "Dependency injection & beans", completed: false },
    { topic: "Spring Boot testing", completed: false },
  ],
  "Week 3": [
    { topic: "Microservices architecture overview", completed: false },
    { topic: "API Gateway & load balancing", completed: false },
    { topic: "Service discovery & communication", completed: false },
    { topic: "Docker & containerization", completed: false },
    { topic: "Kubernetes basics", completed: false },
  ],
  "Week 4": [
    { topic: "SQL queries & joins", completed: false },
    { topic: "Indexing & query optimization", completed: false },
    { topic: "System design basics", completed: false },
    { topic: "Scalability & database design", completed: false },
    { topic: "Distributed systems concepts", completed: false },
  ],
  "Week 5": [
    { topic: "Full mock interview - Backend role", completed: false },
    { topic: "Mock interview review & feedback", completed: false },
    { topic: "Project portfolio review", completed: false },
    { topic: "Interview preparation - communication skills", completed: false },
    { topic: "Final polish & confidence boost", completed: false },
  ],
};

export default function StudyPlanPage() {
  const [exp, setExp] = useState("3");
  const [date, setDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<{ [key: string]: boolean[] }>({});
  const router = useRouter();

  const handleTopicToggle = (weekName: string, topicIndex: number) => {
    if (!completedTopics[weekName]) {
      completedTopics[weekName] = topicsByWeek[weekName].map(t => t.completed);
    }
    const updated = [...completedTopics[weekName]];
    updated[topicIndex] = !updated[topicIndex];
    setCompletedTopics({ ...completedTopics, [weekName]: updated });
  };

  if (selectedWeek) {
    const topics = topicsByWeek[selectedWeek] || [];
    const weekIndex = weeks.findIndex(w => w.w === selectedWeek);
    const weekData = weeks[weekIndex];

    return (
      <Stack spacing={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={() => setSelectedWeek(null)} sx={{ mr: 1 }}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box>
            <Typography variant="h4">{selectedWeek}</Typography>
            <Typography color="text.secondary">{weekData.focus}</Typography>
          </Box>
        </Box>

        <Card sx={{ border: 1, borderColor: "divider", bgcolor: "primary.main", color: "#fff" }}>
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6">Progress</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {completedTopics[selectedWeek]?.filter(t => t).length || 0} / {topics.length} topics completed
                </Typography>
              </Box>
              <Chip
                label={`${weekData.pct}%`}
                sx={{ bgcolor: "#fff", color: "primary.main", fontWeight: 600 }}
              />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={weekData.pct}
              sx={{ mt: 2, height: 8, borderRadius: 4, bgcolor: "rgba(255,255,255,0.2)" }}
            />
          </CardContent>
        </Card>

        <Stack spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Topics to cover</Typography>
          {topics.map((item, idx) => {
            const isCompleted = completedTopics[selectedWeek]?.[idx] ?? item.completed;
            return (
              <Card key={idx} sx={{ border: 1, borderColor: "divider" }}>
                <CardContent>
                  <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                    <Checkbox
                      checked={isCompleted}
                      onChange={() => handleTopicToggle(selectedWeek, idx)}
                      sx={{ flex: 0 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          textDecoration: isCompleted ? "line-through" : "none",
                          color: isCompleted ? "text.secondary" : "inherit",
                        }}
                      >
                        {item.topic}
                      </Typography>
                    </Box>
                    {isCompleted && <CheckCircleOutlined sx={{ color: "success.main" }} />}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h4">Personalized study plan</Typography>
          <Typography color="text.secondary">A roadmap tailored to your experience and target date.</Typography>
        </Box>
      </Box>

      <Card sx={{ border: 1, borderColor: "divider" }}>
        <CardContent>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Years of experience" type="number" value={exp} onChange={(e) => setExp(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Target interview date" type="date" value={date} onChange={(e) => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button fullWidth variant="contained" startIcon={<AutoAwesome />}>Generate plan</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ position: "relative", pl: 4 }}>
        <Box sx={{ position: "absolute", left: 18, top: 18, bottom: 18, width: 2, bgcolor: "divider" }} />
        <Stack spacing={2.5}>
          {weeks.map((w, i) => (
            <Box key={w.w} sx={{ position: "relative" }}>
              <Avatar sx={{ position: "absolute", left: -38, top: 18, bgcolor: w.pct === 100 ? "success.main" : "primary.main", width: 36, height: 36 }}>
                {w.pct === 100 ? <CheckCircleOutlined /> : i + 1}
              </Avatar>
              <Card
                sx={{ border: 1, borderColor: "divider", cursor: "pointer", transition: "all 0.3s", "&:hover": { boxShadow: 2, borderColor: "primary.main" } }}
                onClick={() => setSelectedWeek(w.w)}
              >
                <CardContent>
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="overline" color="text.secondary">{w.w}</Typography>
                      <Typography variant="h6">{w.focus}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Chip label={`${w.pct}%`} color={w.pct === 100 ? "success" : "primary"} variant="outlined" />
                      <School sx={{ color: "primary.main" }} />
                    </Box>
                  </Stack>
                  <LinearProgress variant="determinate" value={w.pct} sx={{ mt: 1.5, height: 6, borderRadius: 3 }} />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
