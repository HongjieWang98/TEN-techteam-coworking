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
  return (
    <>
      <label htmlFor={name}>{label}{(required && "*")}</label>
      <input
        ref={inputRef}
        name={name}
        placeholder={placeholder ?? ""}
        disabled={isLoading}
        type={type}
        required={required}
      />
      <div>
        {errorMessage}
      </div>
    </>
  )
}