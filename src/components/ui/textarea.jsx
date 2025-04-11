export function Textarea({ rows = 3, ...props }) {
  return <textarea {...props} rows={rows} className="w-full border rounded p-2" />;
}