export function Button({ children, onClick, type = 'button', variant = 'default', className = '' }) {
  const base = variant === 'outline'
    ? 'border rounded px-4 py-2 text-sm hover:bg-gray-100'
    : 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';
  return <button type={type} onClick={onClick} className={base + ' ' + className}>{children}</button>;
}