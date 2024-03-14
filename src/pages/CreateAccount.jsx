import { Link } from 'react-router-dom';
import AccountCreation from '../components/AccountCreation';

function CreateAccount() {
  return (
    <>
      <AccountCreation />
      <Link to="/">
        <div className="w-100 text-center mt-2">Already have an account? Sign in</div>
      </Link>
    </>
  );
}

export default CreateAccount;
