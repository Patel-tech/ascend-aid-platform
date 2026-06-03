import {
  Box, Card, CardContent, Stack, Typography, Button, Grid, Chip, LinearProgress, Avatar,
} from "@mui/material";
import { CloudUpload, CheckCircle, WarningAmber, AutoAwesome } from "@mui/icons-material";

const skills = ["Java", "Spring Boot", "JPA/Hibernate", "REST APIs", "Docker", "Kafka", "AWS", "JUnit"];
const strengths = ["Strong Spring Boot project depth", "Clean REST API design", "Good unit test coverage"];
const weaknesses = ["Limited Kubernetes exposure", "No system design case studies", "Missing measurable impact metrics"];
const recommended = ["Microservices patterns", "Distributed caching", "Observability (OpenTelemetry)"];

export default function ResumePage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Resume Analyzer</Typography>
        <Typography color="text.secondary">AI-powered scoring with actionable feedback.</Typography>
      </Box>

      <Card sx={{ border: "2px dashed", borderColor: "divider", textAlign: "center", p: 4 }}>
        <CloudUpload sx={{ fontSize: 48, color: "primary.main" }} />
        <Typography variant="h6" sx={{ mt: 1 }}>Drop your resume here</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>PDF or DOCX</Typography>
        <Button variant="contained" startIcon={<CloudUpload />}>Upload resume</Button>
      </Card>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 96, height: 96, mx: "auto", mb: 1, bgcolor: "primary.main", fontSize: 32, fontWeight: 700 }}>
                74
              </Avatar>
              <Typography variant="h6">Resume score</Typography>
              <Typography variant="body2" color="text.secondary">Good — a few high-impact fixes will push you above 85.</Typography>
              <LinearProgress variant="determinate" value={74} sx={{ mt: 2, height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Extracted skills</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                {skills.map((s) => <Chip key={s} label={s} color="primary" variant="outlined" />)}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <CheckCircle color="success" /><Typography variant="h6">Strengths</Typography>
              </Stack>
              <Stack spacing={1.5}>{strengths.map((s) => <Typography key={s} variant="body2">• {s}</Typography>)}</Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <WarningAmber color="warning" /><Typography variant="h6">Areas to improve</Typography>
              </Stack>
              <Stack spacing={1.5}>{weaknesses.map((s) => <Typography key={s} variant="body2">• {s}</Typography>)}</Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <AutoAwesome color="primary" /><Typography variant="h6">Recommended interview topics</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                {recommended.map((r) => <Chip key={r} label={r} color="primary" />)}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
