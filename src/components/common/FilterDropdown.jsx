import Dropdown from 'react-bootstrap/Dropdown';
import CustomMenu from './FilterDropdownMenu';

/**
 * This component is a dropdown menu that allows the user to select a filter option.
 * It assumes the data is an array of objects with an id and name field.
 * It also assumes, the currElement is an object of the same type as the data array
 */
function FilterDropdown({ currElement, data, callbackFunc }) {
  return (
    <Dropdown
      onSelect={(eventKey) => {
        // this is pretty hacky and im not proud of it, but it works
        callbackFunc(JSON.parse(eventKey));
      }}>
      <Dropdown.Toggle id="dropdown-custom-components">{currElement?.name ?? ''}</Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {data.map((value) => {
          return (
            <Dropdown.Item key={value.id} eventKey={JSON.stringify(value)} active={value.id === currElement.id}>
              {value?.name ?? ''}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterDropdown;
