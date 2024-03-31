/**
 * Represents a read-only input field for displaying information.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name attribute of the input.
 * @param {string} props.value - The value to display in the input.
 * @param {string} [props.type="text"] - The type of the input (e.g., "text", "number").
 * @param {string} props.label - The label associated with the input.
 * @returns {JSX.Element} JSX element representing the read-only input field.
 */
export default function DisplayInput({ name, value, type, label }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input name={name} value={value} type={type} disabled={true} />
    </>
  );
}
