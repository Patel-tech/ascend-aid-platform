import { Box, Breadcrumbs, Typography, Link as MUILink } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { NavigateNext } from "@mui/icons-material";

const breadcrumbLabels: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/quiz": "Quiz",
  "/mock-interview": "Mock Interview",
  "/study-plan": "Study Plan",
  "/resume": "Resume",
  "/documents": "Documents",
  "/notes": "Notes",
  "/bookmarks": "Bookmarks",
  "/flashcards": "Flashcards",
  "/question-generator": "Question Generator",
  "/assistant": "Assistant",
  "/analytics": "Analytics",
  "/admin": "Admin",
  "/settings": "Settings",
};

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/dashboard" },
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
        label: breadcrumbLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      };
    }),
  ];

  // Don't show breadcrumbs on auth pages
  if (location.pathname.includes("/auth")) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ fontSize: "0.875rem" }}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return isLast ? (
            <Typography key={item.path} sx={{ color: "text.primary", fontWeight: 600 }}>
              {item.label}
            </Typography>
          ) : (
            <MUILink component={Link} to={item.path} key={item.path} sx={{ cursor: "pointer", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              {item.label}
            </MUILink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
