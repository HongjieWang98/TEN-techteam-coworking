/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

/**
 * Represents a read-only checkbox group for displaying information.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label associated with the checkbox group.
 * @param {Object} props.options - The options for the checkboxes as key-value pairs.
 * @param {string[]} props.checkedOptions - The array of options that should be checked.
 * @returns {JSX.Element} JSX element representing the read-only checkbox group.
 */
function DisplayCheckboxGroup({ label, options, checkedOptions }) {
  return (
    <div>
      <label>{label}</label>
      {Object.entries(options).map(([value, labelText]) => (
        <div key={value}>
          <input
            name={labelText}
            type="checkbox"
            value={value}
            checked={checkedOptions.includes(value)}
            disabled
          />
          <label htmlFor={labelText}>{labelText}</label>
        </div>
      ))}
    </div>
  );
}

export default DisplayCheckboxGroup;
