import { useAuthContext } from '../../contexts/AuthContext';
import InternalNavigationBar from './InternalNavBar';
import ExternalNavigationBar from './ExternalNavBar';

// based on the Auth Context, lets show the external or internal nav bar
function NavigationBar() {
  const { currentUser } = useAuthContext();

  return currentUser ? <InternalNavigationBar /> : <ExternalNavigationBar />;
}

export default NavigationBar;
