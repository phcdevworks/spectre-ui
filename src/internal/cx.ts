export function cx(...parts: Array<string | false | null | undefined>): string {
  const seen = new Set<string>();
  const classes: string[] = [];

  for (const part of parts) {
    if (!part) continue;
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (!/\s/.test(trimmed)) {
      if (!seen.has(trimmed)) {
        seen.add(trimmed);
        classes.push(trimmed);
      }
      continue;
    }

    for (const token of trimmed.split(/\s+/)) {
      if (!token || seen.has(token)) continue;
      seen.add(token);
      classes.push(token);
    }
  }

  return classes.join(" ");
}
