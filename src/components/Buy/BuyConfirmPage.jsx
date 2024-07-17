import { useBuyContext } from '../../contexts/BuyContext';

function BuyConfirmPage() {
  const { cartData } = useBuyContext();

  return (
    <>
      {cartData.map((textbook) => {
        return <h1 key={textbook.id}>{textbook.title}</h1>;
      })}
    </>
  );
}

export default BuyConfirmPage;
