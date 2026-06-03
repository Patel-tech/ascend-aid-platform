import { type ReactNode } from "react";
import { Box, Card, Stack, Typography, Avatar } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "background.default", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 440, p: 4, border: 1, borderColor: "divider" }}>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 3, textAlign: "center" }}>
          <Avatar sx={{ width: 52, height: 52, background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}>
            <AutoAwesome />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Stack>
        {children}
      </Card>
    </Box>
  );
}
