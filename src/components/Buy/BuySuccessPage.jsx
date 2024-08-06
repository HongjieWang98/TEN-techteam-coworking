import { useLocation } from 'react-router-dom';

function BuySuccessPage() {
  const location = useLocation();
  const { state } = location;
  const { bookReserve } = state || {}; // Extract bookReserve from state
  return (
    <>
      <h1>Textbook Reserve Report</h1>
      {bookReserve ? (
        <>
          <h1>Textbooks Bought {bookReserve.length}</h1>
          {bookReserve.map((textbook) => {
            return <h1 key={textbook.id}>{textbook.title}</h1>;
          })}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default BuySuccessPage;
