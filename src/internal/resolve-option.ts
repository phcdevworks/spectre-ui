export function resolveOption<T extends string>(config: {
  name: string;
  value: T | undefined;
  allowed: readonly T[];
  fallback: T;
}): T {
  const { name, value, allowed, fallback } = config;

  if (value === undefined) return fallback;
  if (allowed.includes(value)) return value;

  if (process.env.NODE_ENV !== "production") {
    throw new Error(`[spectre-ui] Unknown ${name}: ${value}`);
  }

  return fallback;
}
