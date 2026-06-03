import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/auth/register")({ component: Register });

function Register() {
  return (
    <AuthLayout title="Create your account" subtitle="Start prepping smarter in 60 seconds">
      <Stack spacing={2}>
        <Button variant="outlined" startIcon={<Google />} fullWidth>Sign up with Google</Button>
        <Button variant="outlined" startIcon={<GitHub />} fullWidth>Sign up with GitHub</Button>
        <Divider>or</Divider>
        <TextField label="Full name" size="small" fullWidth />
        <TextField label="Email" size="small" fullWidth />
        <TextField label="Password" type="password" size="small" fullWidth />
        <Button variant="contained" size="large" component={Link} to="/dashboard">Create account</Button>
        <Typography variant="body2" sx={{ textAlign: "center" }} color="text.secondary">
          Already a member?{" "}
          <Typography component={Link} to="/auth/login" variant="body2" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
            Sign in
          </Typography>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
