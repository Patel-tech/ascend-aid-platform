import { createTheme, type ThemeOptions } from "@mui/material/styles";

const sharedTokens: ThemeOptions = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 16, paddingBlock: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, backgroundImage: "none" },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
};

export const lightTheme = createTheme({
  ...sharedTokens,
  palette: {
    mode: "light",
    primary: { main: "#6366f1", light: "#818cf8", dark: "#4f46e5" },
    secondary: { main: "#06b6d4" },
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    background: { default: "#f7f8fc", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
    divider: "rgba(15,23,42,0.08)",
  },
});

export const darkTheme = createTheme({
  ...sharedTokens,
  palette: {
    mode: "dark",
    primary: { main: "#818cf8", light: "#a5b4fc", dark: "#6366f1" },
    secondary: { main: "#22d3ee" },
    success: { main: "#34d399" },
    warning: { main: "#fbbf24" },
    error: { main: "#f87171" },
    background: { default: "#0b0f1a", paper: "#111827" },
    text: { primary: "#f1f5f9", secondary: "#94a3b8" },
    divider: "rgba(255,255,255,0.08)",
  },
});
