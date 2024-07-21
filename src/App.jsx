import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Overview/Home/Home';
import HowToPage from './pages/Overview/HowTo/HowTo';
import SchoolNavPage from './pages/Overview/SchoolNav/SchoolNav';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import ViewListingPage from './pages/Listing/ViewListingPage';
import { Providers } from './contexts/Providers';
import AcceptDenyBuyerPage from './pages/Listing/AceeptDenyBuyerPage';
import PageWrapper from './components/PageWrapper';
import CreateAccount from './pages/Account/CreateAccount';
import SuccessCreateAccount from './pages/Account/SuccessAccountCreate';
import Profile from './pages/Profile';
import Inventory from './pages/Buy/Inventory';
import { BuyProvider } from './contexts/BuyContext';
import BuyConfirm from './pages/Buy/BuyConfirm';
import NavigationBar from './components/NavigationBar/NavBar';

function App() {
  return (
    <Router>
      <Providers>
        <NavigationBar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/school" element={<SchoolNavPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/how" element={<HowToPage />} />
            <Route path="/signup" element={<CreateAccount />} />

            <Route path="/sell">
              <Route path="list" element={<ListingPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/listing">
              <Route path="buy" />
              <Route path=":listingId" element={<ViewListingPage />} />
              <Route path=":listingId/accept" element={<AcceptDenyBuyerPage />} />
            </Route>
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signup/success" element={<SuccessCreateAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/buyconfirm" element={<BuyConfirm />} />
          </Routes>
        </PageWrapper>
      </Providers>
    </Router>
  );
}

export default App;
