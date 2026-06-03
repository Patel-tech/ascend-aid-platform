import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/auth/forgot")({ component: Forgot });

function Forgot() {
  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a secure reset link">
      <Stack spacing={2}>
        <TextField label="Email" size="small" fullWidth />
        <Button variant="contained" size="large">Send reset link</Button>
        <Typography variant="body2" sx={{ textAlign: "center" }} color="text.secondary">
          <Typography component={Link} to="/auth/login" variant="body2" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
            Back to sign in
          </Typography>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
