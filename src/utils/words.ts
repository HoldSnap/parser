export function topLongestWords(text: string, limit: number): string[] {
  const words = text.match(/\p{L}+/gu);
  if (!words) {
    return [];
  }

  const uniqueWords = Array.from(new Set(words));

  uniqueWords.sort((a, b) => b.length - a.length);

  return uniqueWords.slice(0, limit);
}
