export default function Select({
  label,
  value,
  onChange,
  error,
  children,
  name,
  required = false,
}) {
  return (
    <div className="w-full">
      <label className="text-gray-600 font-light text-sm" htmlFor={name}>
        {label}
      </label>
      <select
        className="w-full h-8 rounded-md p-2 bg-gray-200"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
      {error && <p className="text-red-600 font-thin text-sm">{error}</p>}
    </div>
  );
}
