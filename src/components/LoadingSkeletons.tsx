import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

/**
 * Reusable loading skeletons for data-fetching states.
 * Use <PageSkeleton /> for whole-page loads or <CardSkeleton /> / <ListSkeleton /> for inline regions.
 */
export function PageSkeleton() {
  return (
    <Stack spacing={3} aria-busy="true" aria-live="polite">
      <Skeleton variant="text" width={240} height={48} />
      <Skeleton variant="text" width={360} height={24} />
      <Stack direction="row" spacing={2}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width="100%" height={120} />
        ))}
      </Stack>
      <Skeleton variant="rounded" width="100%" height={320} />
    </Stack>
  );
}

export function CardSkeleton({ height = 180 }: { height?: number }) {
  return (
    <Card sx={{ border: 1, borderColor: "divider" }} aria-busy="true">
      <CardContent>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="40%" height={20} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rounded" width="100%" height={height} />
        </Box>
      </CardContent>
    </Card>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Stack spacing={1.5} aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <Stack key={i} direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
