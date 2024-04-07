import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Overview/Home/Home';
import HowToPage from './pages/Overview/HowTo/HowTo';
import SchoolNavPage from './pages/Overview/SchoolNav/SchoolNav';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import { SellProvider } from './contexts/SellContext';
import NavigationBar from './components/ExternalNavigationBar/ExternalNavBar';
import ViewListingPage from './pages/Listing/ViewListingPage';
import { Providers } from './contexts/Providers';
import CreateAccount from './pages/CreateAccount';
import AcceptDenyBuyerPage from './pages/Listing/AceeptDenyBuyerPage';
import PageWrapper from './components/PageWrapper';

function App() {
  return (
    <Router>

      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Home" element={<HomePage />}/>
        <Route path="/Home/howto" element={<HowToPage />}/>
        <Route path="/Home/schoolnav" element={<SchoolNavPage />}/>
        <Route path="/Home/signin" element={<LoginPage />}/>
        <Route path="/Home/signup" element={<CreateAccount />}/>
      </Routes>

      <Providers>
        <PageWrapper>
          <Routes>
            {/* <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<CreateAccount />} /> */}
            <Route path="/applicationform" element={<ApplicationForm />} />
            <Route path="sell">
              <Route path="list" element={<ListingPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/listing/">
              <Route path=":listingId" element={<ViewListingPage />} />
              <Route path=":listingId/accept" element={<AcceptDenyBuyerPage />} />
            </Route>
           
          </Routes>
        </PageWrapper>
      </Providers>
    </Router>
  );
}

export default App;
