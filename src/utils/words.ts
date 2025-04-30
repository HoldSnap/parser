export function topLongestWords(text: string, limit: number): string[] {
  const matches = text.match(/\p{L}[\p{L}'-]*/gu) ?? [];

  const map = new Map<string, string>();
  for (const raw of matches) {
    const word = raw.normalize("NFC");
    const key = word.toLowerCase();
    const prev = map.get(key);
    if (!prev || word.length > prev.length) {
      map.set(key, word);
    }
  }

  const unique = Array.from(map.values());

  unique.sort((a, b) => {
    const diff = b.length - a.length;
    if (diff !== 0) return diff;

    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });

  return unique.slice(0, limit);
}
