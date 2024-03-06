import Dropdown from 'react-bootstrap/Dropdown';
import CustomMenu from './FilterDropdownMenu';

function FilterDropdown({ currElement, data, callbackFunc }) {
  return (
    <Dropdown onSelect={(eventKey) => callbackFunc(eventKey)}>
      <Dropdown.Toggle id="dropdown-custom-components">{currElement}</Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {data.map((value, index) => {
          if (value === currElement) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Dropdown.Item key={index} eventKey={value} active>
                {value}
              </Dropdown.Item>
            );
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Dropdown.Item key={index} eventKey={value}>
              {value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterDropdown;
