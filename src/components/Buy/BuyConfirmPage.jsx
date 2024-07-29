import { Link, useNavigate } from 'react-router-dom';
import { useBuyContext } from '../../contexts/BuyContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { reserveTextbooks } from '../../api/textbook';

function BuyConfirmPage() {
  const { cartData, emptyCart } = useBuyContext();
  const navigate = useNavigate();
  const { getCurrentUser } = useAuthContext();
  const currentUser = getCurrentUser();

  async function reserveBooks() {
    // Reserve the textbooks returns a list of the textbook object with an
    // additional parameter to state whether it has been bought or not
    const bookReserve = await reserveTextbooks(cartData, currentUser.id);
    emptyCart();
    navigate('/buysuccess', { state: { bookReserve } });
  }

  return (
    <>
      {cartData.map((textbook) => {
        return <h1 key={textbook.id}>{textbook.title}</h1>;
      })}

      <Link to="/inventory" className="btn btn-primary" type="button">
        Add Another Item
      </Link>

      {
        // Only can click to reserve textbooks if the current user has been loaded
        currentUser ? (
          <button type="button" onClick={reserveBooks}>
            Reserve Books
          </button>
        ) : (
          <h1>Loading...</h1>
        )
      }
    </>
  );
}

export default BuyConfirmPage;
