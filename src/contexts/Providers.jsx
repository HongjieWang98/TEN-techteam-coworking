import { SellProvider } from './SellContext';
import { AuthProvider } from './AuthContext';
import { BuyProvider } from './BuyContext';

// TODO move the sell provider to just the /sell routes
// TODO move the buy provide to just the /buy routes
export function Providers({ children }) {
  return (
    <AuthProvider>
      <SellProvider>{children}</SellProvider>
      <BuyProvider>{children}</BuyProvider>
    </AuthProvider>
  );
}
