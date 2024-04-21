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
import SuccessCreateAccount from './pages/Account/SuccessAccountCreate';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
    
      <ExternalNavigationBar />
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
            {/* <Route path="/applicationform" element={<ApplicationForm />} /> */}
            <Route path="sell">
              <Route path="list" element={<ListingPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/listing/">
              <Route path=":listingId" element={<ViewListingPage />} />
              <Route path=":listingId/accept" element={<AcceptDenyBuyerPage />} />
            </Route>
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signup/success" element={<SuccessCreateAccount />} />
            <Route path="/profile" element={<Profile />} />
           
          </Routes>
        </PageWrapper>
      </Providers>
    </Router>
  );
}

export default App;
