export default function generateID() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
