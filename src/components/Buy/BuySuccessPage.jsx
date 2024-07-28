function BuySuccessPage({ booksReserve }) {
  // **** IMPORTANT NEED TO STILL CLEAR THE CART DATA ****
  return (
    <>
      <h1>Textbook Reserve Report</h1>
      {booksReserve ? (
        <>
          <h1>Textbooks Bought {booksReserve.length}</h1>
          {booksReserve.map((textbook) => {
            return (
              <h1 key={textbook.id}>
                {textbook.title} and successfully bought {textbook.bought}
              </h1>
            );
          })}{' '}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default BuySuccessPage;
