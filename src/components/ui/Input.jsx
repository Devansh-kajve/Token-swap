export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  error,
  showMaxButton,
  onMaxClick,
}) => (
  <div className="flex-1">
    {label && (
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs text-gray-500">{label}</label>
        {showMaxButton && (
          <button
            onClick={onMaxClick}
            className="text-xs text-blue-500 hover:text-blue-600 font-medium"
          >
            MAX
          </button>
        )}
      </div>
    )}
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full px-3 py-2 text-lg font-semibold bg-transparent border-0 focus:outline-none ${
        readOnly ? "text-gray-500 cursor-not-allowed" : "text-gray-900"
      } ${error ? "text-red-500" : ""}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
