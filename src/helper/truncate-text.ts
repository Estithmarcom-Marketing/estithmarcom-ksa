export default function truncateText(
  text: string | null,
  char: number,
): string {
  if (typeof text !== "string") return "";
  if (text.length <= char) return text;
  return text.slice(0, char) + "...";
}
