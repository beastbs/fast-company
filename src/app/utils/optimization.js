export function cutLongString(string) {
  return string.length > 8 ? string.slice(0, 8) + "..." : string;
}
