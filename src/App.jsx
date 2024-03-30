import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import ViewListingPage from './pages/Listing/ViewListingPage';
import { Providers } from './contexts/Providers';
import CreateAccount from './pages/CreateAccount';
import PageWrapper from './pages/PageWrapper';

function App() {
  return (
    <Router>
      <Providers>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/applicationform" element={<ApplicationForm />} />
            <Route path="sell">
              <Route path="list" element={<ListingPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/listing/">
              <Route path=":listingId" element={<ViewListingPage />} />
            </Route>
            <Route path="/signup" element={<CreateAccount />} />
          </Routes>
        </PageWrapper>
      </Providers>
    </Router>
  );
}

export default App;
