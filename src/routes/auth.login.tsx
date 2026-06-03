import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/auth/login")({ component: Login });

function Login() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your prep">
      <Stack spacing={2}>
        <Button variant="outlined" startIcon={<Google />} fullWidth>Continue with Google</Button>
        <Button variant="outlined" startIcon={<GitHub />} fullWidth>Continue with GitHub</Button>
        <Divider>or</Divider>
        <TextField label="Email" size="small" fullWidth />
        <TextField label="Password" type="password" size="small" fullWidth />
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Typography component={Link} to="/auth/forgot" variant="caption" sx={{ color: "primary.main", textDecoration: "none" }}>
            Forgot password?
          </Typography>
        </Stack>
        <Button variant="contained" size="large" component={Link} to="/dashboard">Sign in</Button>
        <Typography variant="body2" sx={{ textAlign: "center" }} color="text.secondary">
          New here?{" "}
          <Typography component={Link} to="/auth/register" variant="body2" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
            Create an account
          </Typography>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
