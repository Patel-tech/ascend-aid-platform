import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store, useAppSelector } from "@/store";
import { lightTheme, darkTheme } from "@/theme/theme";

function ThemedShell({ children }: { children: ReactNode }) {
  const mode = useAppSelector((s) => s.theme.mode);
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemedShell>{children}</ThemedShell>
    </Provider>
  );
}
