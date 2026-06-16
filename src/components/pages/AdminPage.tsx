import {
  Box, Card, CardContent, Stack, Typography, Grid, Avatar, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, LinearProgress, IconButton,
} from "@mui/material";
import { People, Description, SmartToy, MemoryOutlined, ArrowBack } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

const users = [
  { name: "Dharmendra Patel", email: "Dharmendra@interviewai.dev", plan: "Pro", status: "Active" },
  { name: "Mei Tanaka", email: "mei@example.com", plan: "Free", status: "Active" },
  { name: "Carlos Ruiz", email: "carlos@example.com", plan: "Pro", status: "Trial" },
  { name: "Priya Shah", email: "priya@example.com", plan: "Pro", status: "Active" },
];

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar sx={{ bgcolor: `${color}22`, color, width: 48, height: 48 }}>{icon}</Avatar>
          <Box><Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
  const router = useRouter();
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Box>
          <Typography variant="h4">Admin dashboard</Typography>
          <Typography color="text.secondary">Manage users, content and monitor system health.</Typography>
        </Box>
      </Box>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}><MetricCard icon={<People />} label="Total users" value="3,482" color="#6366f1" /></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}><MetricCard icon={<Description />} label="Documents indexed" value="14,209" color="#06b6d4" /></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}><MetricCard icon={<SmartToy />} label="AI requests / day" value="89,124" color="#10b981" /></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}><MetricCard icon={<MemoryOutlined />} label="System uptime" value="99.98%" color="#f59e0b" /></Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Users</Typography>
              <Table>
                <TableHead>
                  <TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Plan</TableCell><TableCell>Status</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.email} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}>{u.name[0]}</Avatar>
                          {u.name}
                        </Stack>
                      </TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{u.email}</Typography></TableCell>
                      <TableCell><Chip size="small" label={u.plan} color={u.plan === "Pro" ? "primary" : "default"} variant="outlined" /></TableCell>
                      <TableCell><Chip size="small" label={u.status} color={u.status === "Active" ? "success" : "warning"} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ border: 1, borderColor: "divider", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>System health</Typography>
              <Stack spacing={2.5}>
                {[
                  { name: "API latency", v: 22, label: "118 ms" },
                  { name: "Vector DB load", v: 64, label: "64%" },
                  { name: "AI tokens used (today)", v: 41, label: "4.1M / 10M" },
                  { name: "Storage", v: 58, label: "232 GB / 400 GB" },
                ].map((h) => (
                  <Box key={h.name}>
                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">{h.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{h.label}</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={h.v} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
