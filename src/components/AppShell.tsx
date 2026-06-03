import { useState, type ReactNode } from "react";
import {
  AppBar, Avatar, Badge, Box, Divider, Drawer, IconButton, InputBase, List, ListItemButton,
  ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon, SmartToy, Description, RecordVoiceOver, QuestionAnswer, Quiz,
  Article, EventNote, Style, Bookmark, Insights, Settings, Menu as MenuIcon, Search,
  Notifications, LightMode, DarkMode, Logout, AdminPanelSettings, AutoAwesome,
} from "@mui/icons-material";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleMode } from "@/store/themeSlice";

const drawerWidth = 260;

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/assistant", label: "AI Assistant", icon: <SmartToy /> },
  { to: "/documents", label: "Documents", icon: <Description /> },
  { to: "/mock-interview", label: "Mock Interview", icon: <RecordVoiceOver /> },
  { to: "/question-generator", label: "Question Generator", icon: <QuestionAnswer /> },
  { to: "/quiz", label: "Quiz", icon: <Quiz /> },
  { to: "/resume", label: "Resume Analyzer", icon: <Article /> },
  { to: "/study-plan", label: "Study Plan", icon: <EventNote /> },
  { to: "/notes", label: "Notes Summarizer", icon: <Article /> },
  { to: "/flashcards", label: "Flashcards", icon: <Style /> },
  { to: "/bookmarks", label: "Bookmarks", icon: <Bookmark /> },
  { to: "/analytics", label: "Analytics", icon: <Insights /> },
  { to: "/admin", label: "Admin", icon: <AdminPanelSettings /> },
  { to: "/settings", label: "Settings", icon: <Settings /> },
];

function SidebarContent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const theme = useTheme();
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ gap: 1.2, px: 2.5 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2,
            background: "linear-gradient(135deg,#6366f1,#06b6d4)",
            display: "grid", placeItems: "center", color: "#fff",
          }}
        >
          <AutoAwesome fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1 }}>
            PrepPilot
          </Typography>
          <Typography variant="caption" color="text.secondary">
            AI Interview Coach
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1.2, py: 1.5, overflowY: "auto" }}>
        {nav.map((item) => {
          const active = pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              sx={{
                borderRadius: 2, mb: 0.5, py: 1,
                color: active ? "primary.main" : "text.secondary",
                bgcolor: active
                  ? theme.palette.mode === "dark"
                    ? "rgba(129,140,248,0.12)"
                    : "rgba(99,102,241,0.10)"
                  : "transparent",
                "&:hover": { bgcolor: theme.palette.action.hover },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { fontWeight: active ? 600 : 500, fontSize: 14 } }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2, m: 1.5, borderRadius: 3, bgcolor: "action.hover" }}>
        <Typography variant="caption" color="text.secondary">PRO TIP</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500 }}>
          Daily 30-min mock interviews boost readiness 3×.
        </Typography>
      </Box>
    </Box>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const user = useAppSelector((s) => s.auth.user);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flex: 1, maxWidth: 460, display: "flex", alignItems: "center", gap: 1,
              px: 2, py: 0.75, borderRadius: 2, bgcolor: "action.hover",
            }}
          >
            <Search fontSize="small" sx={{ color: "text.secondary" }} />
            <InputBase
              placeholder="Search questions, docs, topics…"
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>
          <Box sx={{ flex: 1 }} />
          <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton onClick={() => dispatch(toggleMode())}>
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge color="error" variant="dot"><Notifications /></Badge>
            </IconButton>
          </Tooltip>
          <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>
              {user?.name?.[0] ?? "A"}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 220, borderRadius: 2 } } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2">{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Divider />
            <MenuItem component={Link} to="/settings" onClick={() => setProfileAnchor(null)}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon> Settings
            </MenuItem>
            <MenuItem component={Link} to="/auth/login" onClick={() => setProfileAnchor(null)}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon> Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <SidebarContent />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth, boxSizing: "border-box",
              borderRight: 1, borderColor: "divider", bgcolor: "background.paper",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3.5 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
