const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (v: string) => EMAIL_RE.test(v);

export const isStrongPassword = (v: string) =>
  v.length >= 8 && /[A-Z]/.test(v) && /\d/.test(v);

export const required = (v: unknown) =>
  v !== undefined && v !== null && String(v).trim().length > 0;
