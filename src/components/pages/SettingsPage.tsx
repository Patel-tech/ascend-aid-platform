import {
  Box, Card, CardContent, Stack, Typography, TextField, Switch, FormControlLabel, Button, Avatar, Divider, Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleMode } from "@/store/themeSlice";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Settings</Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: 24 }}>{user?.name?.[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                <TextField label="Full name" defaultValue={user?.name} size="small" />
                <TextField label="Email" defaultValue={user?.email} size="small" />
                <TextField label="Target role" defaultValue="Senior Backend Engineer" size="small" />
                <Button variant="contained" sx={{ alignSelf: "flex-start" }}>Save changes</Button>
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
