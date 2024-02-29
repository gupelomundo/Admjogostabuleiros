export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeHolder,
  required,
  checked,
}) {
  return (
    <div className="w-full">
      <label className=" text-gray-600 font-light text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        className={`w-full rounded-md p-2 bg-gray-200 ${
          type === "checkbox" ? "h-4 w-6" : "h-8 "
        }`}
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        checked={checked}
      />
      {error && <p className="text-red-600 font-thin text-sm">{error}</p>}
    </div>
  );
}
