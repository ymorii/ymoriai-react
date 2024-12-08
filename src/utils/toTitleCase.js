export default function toTitleCase(text) {
  return text
    .split(' ')
    .map((i) => i.replace(i[0], i[0].toUppercase()))
    .join(' ');
}
