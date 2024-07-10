import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Overview/Home/Home';
import HowToPage from './pages/Overview/HowTo/HowTo';
import SchoolNavPage from './pages/Overview/SchoolNav/SchoolNav';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import ExternalNavigationBar from './components/NavigationBar/ExternalNavBar';
import ViewListingPage from './pages/Listing/ViewListingPage';
import { Providers } from './contexts/Providers';
import AcceptDenyBuyerPage from './pages/Listing/AceeptDenyBuyerPage';
import PageWrapper from './components/PageWrapper';
import CreateAccount from './pages/Account/CreateAccount';
import SuccessCreateAccount from './pages/Account/SuccessAccountCreate';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <ExternalNavigationBar />
      <PageWrapper>
        <Providers>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home/schoolnav" element={<SchoolNavPage />} />
            <Route path="/home/signin" element={<LoginPage />} />
            <Route path="/home/learn" element={<HowToPage />} />
            <Route path="/home/signup" element={<CreateAccount />} />

            <Route path="/sell">
              <Route path="list" element={<ListingPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/listing">
              <Route path=":listingId" element={<ViewListingPage />} />
              <Route path=":listingId/accept" element={<AcceptDenyBuyerPage />} />
            </Route>
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signup/success" element={<SuccessCreateAccount />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Providers>
      </PageWrapper>
    </Router>
  );
}

export default App;
