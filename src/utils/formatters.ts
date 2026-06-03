export const formatDate = (iso: string, locale = "en-US") =>
  new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatNumber = (n: number) => new Intl.NumberFormat().format(n);

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
};

export const truncate = (s: string, n = 80) =>
  s.length <= n ? s : `${s.slice(0, n - 1)}…`;
