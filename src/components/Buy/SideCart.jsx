import { Link } from 'react-router-dom';
import { useBuyContext } from '../../contexts/BuyContext';
import './SideCart.css';

function SideCartEntry({ textbook, setTableData, handleAddToCart }) {
  const { removeFromCart } = useBuyContext();
  /* Show buttons if their corresponding functions are defined */
  function handleFunc() {
    return (
      <button
        onClick={() => {
          if (window.confirm('Are you sure you wish to delete this item?')) {
            // Add the Add to Cart button back again after removing an element from the cart
            setTableData((prevState) => {
              const rowIndex = prevState.rows.findIndex((row) => row.id === textbook.id);
              const newRows = [...prevState.rows];

              if (rowIndex !== -1) {
                newRows[rowIndex] = {
                  ...newRows[rowIndex],
                  addToCart: (
                    <button type="button" onClick={(e) => handleAddToCart(textbook, e)}>
                      Add to cart
                    </button>
                  )
                };
              }
              return {
                ...prevState,
                rows: newRows
              };
            });
            removeFromCart(textbook);
          }
        }}
        type="button"
        className="SubEntryButtons">
        Remove
      </button>
    );
  }

  return (
    <div className="container">
      <div className="SideCartEntryContainer row">
        <div className="col-md-9">
          <div className="EntryItemName">{textbook.title}</div>
        </div>
        <div className="col-md-3">
          <div className="EntrySubInfo">{textbook.courseAndDpmt}</div>
          <div className="EntrySubInfo">{textbook.price}</div>
          {handleFunc()}
        </div>
      </div>
      <div className="row">
        <hr />
      </div>
    </div>
  );
}

export default function SideCart({ setTableData, handleAddToCart }) {
  const { cartData } = useBuyContext();

  return (
    <div className="container">
      <div className="col-sm SideCartContainer">
        <div className="Box">
          <div className="SideCartHeader">
            <i className="fa fa-shopping-cart" />
            Cart ({cartData.length})
          </div>
          <div className="SideCartEntries container-fluid">
            {cartData.length === 0 ? (
              <div className="CartEmptyText">Your cart is empty</div>
            ) : (
              cartData.map((textbook) => {
                return (
                  <SideCartEntry
                    key={textbook.id}
                    textbook={textbook}
                    setTableData={setTableData}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })
            )}
          </div>

          {cartData.length > 0 && (
            <Link to="/buyconfirm" className="SideCartContinueButton btn btn-primary" type="button">
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
