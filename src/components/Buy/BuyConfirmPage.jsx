import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useBuyContext } from '../../contexts/BuyContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { reserveTextbooks } from '../../api/textbook';

function BuyConfirmPage() {
  const { cartData, emptyCart } = useBuyContext();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  async function reserveBooks() {
    // Reserve the textbooks returns a list of the textbook object with an
    // additional parameter to state whether it has been bought or not
    const bookReserve = await reserveTextbooks(cartData, currentUser.id);
    emptyCart();
    navigate('/buysuccess', { state: { bookReserve } });
  }

  function backToInventory() {
    navigate('/inventory');
  }

  return (
    <>
      <h2>Textbooks:</h2>
      {currentUser && cartData ? (
        <>
          <Table bordered>
            <thead>
              <tr>
                <th>Course</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((textbook) => (
                <tr key={textbook.id}>
                  <td>{`${textbook.department} ${textbook.course_number}`}</td>
                  <td>{textbook.title}</td>
                  <td>{textbook.author}</td>
                  <td>{textbook.isbn}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <button type="button" className="btn btn-primary" onClick={backToInventory}>
            Add Another Item
          </button>

          <button type="button" className="btn btn-secondary" onClick={reserveBooks}>
            Reserve Books
          </button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default BuyConfirmPage;
