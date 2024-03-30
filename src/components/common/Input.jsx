// For uniform styling in the future
export default function Input({
  name,
  placeholder,
  isLoading,
  inputRef,
  errorMessage,
  type,
  label,
  required
}) {
  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  }

  return (
    <div style={inputContainerStyle}>
      <label htmlFor={name} style={{ "fontWeight": "bold" }}>
        {label}
        {required && '*'}
      </label>
      <input
        ref={inputRef}
        name={name}
        placeholder={placeholder ?? ''}
        disabled={isLoading}
        type={type}
        required={required}
      />
      <div>{errorMessage}</div>
    </div>
  );
}
