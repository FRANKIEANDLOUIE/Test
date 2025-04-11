export function Card({ children }) {
  return <div className="rounded-2xl shadow p-4 border bg-white">{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}