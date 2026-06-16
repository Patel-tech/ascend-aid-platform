import {
  Box, Card, CardContent, Stack, Typography, TextField, Switch, FormControlLabel, Button, Avatar, Divider, Grid, IconButton,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleMode } from "@/store/themeSlice";
import { updateUser } from "@/store/authSlice";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const user = useAppSelector((s) => s.auth.user);
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSaveChanges = () => {
    if (fullName.trim()) {
      dispatch(updateUser({ name: fullName, email }));
      router.navigate({ to: "/dashboard" });
    }
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={() => router.history.back()} sx={{ mr: 1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Typography variant="h4">Settings</Typography>
      </Box>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: 24 }}>{fullName?.[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{email}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                <TextField label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} size="small" />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} size="small" />
                <TextField label="Target role" defaultValue="Senior Backend Engineer" size="small" />
                <Button variant="contained" sx={{ alignSelf: "flex-start" }} onClick={handleSaveChanges}>Save changes</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Preferences</Typography>
              <Stack spacing={1.5} divider={<Divider />}>
                <FormControlLabel control={<Switch checked={mode === "dark"} onChange={() => dispatch(toggleMode())} />} label="Dark mode" />
                <FormControlLabel control={<Switch defaultChecked />} label="Daily study reminders" />
                <FormControlLabel control={<Switch defaultChecked />} label="Weekly progress emails" />
                <FormControlLabel control={<Switch />} label="Beta features" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
