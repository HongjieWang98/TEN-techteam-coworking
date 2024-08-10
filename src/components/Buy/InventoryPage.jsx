import { useState } from 'react';
import InventoryTable from './InventoryTable';
import SideCart from './SideCart';
import { useBuyContext } from '../../contexts/BuyContext';
import './InventoryPage.css';

// eslint-disable-next-line no-unused-vars
export default function InventoryPage({ buyFunctionality }) {
  // Used in the handleAddToCart
  const { addToCart } = useBuyContext();
  // Represents the data prop passed into the datatable
  // Edited in the SideCart component
  const [data, setData] = useState({
    columns: [],
    rows: []
  });
  // This function is outside of the Inventory component because on removal of
  // element from the cart a button that calls this function on click needs to be readded to that element in the data table
  // This function is also needed to initalize the data table (all rows will have this button on load of the database)
  const handleAddToCart = (rowInfo, e) => {
    e.stopPropagation();
    setData((prevState) => {
      const rowIndex = prevState.rows.findIndex((row) => row.id === rowInfo.id);
      const newRows = [...prevState.rows];

      if (rowIndex !== -1) {
        newRows[rowIndex] = {
          ...newRows[rowIndex],
          addToCart: 'In Cart'
        };
      }
      return {
        ...prevState,
        rows: newRows
      };
    });
    addToCart(rowInfo);
  };

  return (
    <>
      <h1 className="page-title">Textbook Inventory</h1>
      <div className="inventory-page">
        <div className="inventory-table">
          <InventoryTable buyFunctionality tableData={data} setTableData={setData} handleAddToCart={handleAddToCart} />
        </div>
        {buyFunctionality && (
          <div className="side-cart">
            <SideCart setTableData={setData} handleAddToCart={handleAddToCart} />
          </div>
        )}
      </div>
    </>
  );
}
