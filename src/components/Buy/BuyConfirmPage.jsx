import { Link, useNavigate } from 'react-router-dom';
import { useBuyContext } from '../../contexts/BuyContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { reserveTextbooks } from '../../api/textbook';

function BuyConfirmPage() {
  const { cartData } = useBuyContext();
  const navigate = useNavigate();
  const { getCurrentUser } = useAuthContext();
  const currentUser = getCurrentUser();

  async function reserveBooks() {
    // Only reserve textbooks if the current user has been loaded

    const bookReserve = await reserveTextbooks(cartData, currentUser.id);

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

      {currentUser ? (
        <button type="button" onClick={reserveBooks}>
          Reserve Books
        </button>
      ) : (
        <h1>Loading...</h1>
      )}

      {/* <Link to="/inventory" className="btn btn-primary" type="button">
        Confirm Your Reservation
      </Link> */}
    </>
  );
}

export default BuyConfirmPage;
