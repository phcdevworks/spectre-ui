type AllowedValues<T extends string> = readonly T[] | Record<T, unknown>;

const hasOwn = (value: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, key);

const isAllowedValue = <T extends string>(value: T, allowed: AllowedValues<T>): boolean =>
  Array.isArray(allowed) ? allowed.includes(value) : hasOwn(allowed, value);

export function resolveOption<T extends string>(config: {
  name: string;
  value: T | undefined;
  allowed: AllowedValues<T>;
  fallback: T;
}): T {
  const { name, value, allowed, fallback } = config;

  if (value === undefined) return fallback;
  if (isAllowedValue(value, allowed)) return value;

  if (process.env.NODE_ENV !== "production") {
    throw new Error(`[spectre-ui] Unknown ${name}: ${value}`);
  }

  return fallback;
}
