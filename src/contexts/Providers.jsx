import { SellProvider } from "./SellContext";
import { AuthProvider } from "./AuthContext";

// TODO move the sell provider to just the /sell routes
export function Providers({ children }) {
    return (
        <AuthProvider>
            <SellProvider>
                {children}
            </SellProvider>
        </AuthProvider>
    );
}