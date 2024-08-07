import { Link } from 'react-router-dom';
import AccountCreation from '../../components/Login/AccountCreation';

function CreateAccount() {
  return (
    <>
      <AccountCreation />
      <Link to="/signin">
        <div className="w-100 text-center mt-2">Already have an account? Sign in</div>
      </Link>
    </>
  );
}

export default CreateAccount;
