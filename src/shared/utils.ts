export const capitalize = (sentence: string) => {
  if (!sentence) return '';
  return sentence
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
