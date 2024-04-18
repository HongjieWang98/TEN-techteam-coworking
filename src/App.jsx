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
import Profile from './pages/Profile';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/Home" element={<HomePage />}> </Route>
        <Route path="/Home/howto" element={<HowToPage />}> </Route>
        <Route path="/Home/schoolnav" element={<SchoolNavPage />}> </Route>
      </Routes>

      <SellProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/applicationform" element={<ApplicationForm />} />

          <Route path="/sell/list" element={<ListingPage />}></Route>
          <Route path="/sell/confirmation" element={<ConfirmationPage />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>

          <Route path="/sell/list" element={<ListingPage />} />
          <Route path="/sell/confirmation" element={<ConfirmationPage />} />
          <Route path="/signup" element={<CreateAccount />} />

        </Routes>
      </SellProvider>
    </Router>
  );
}

export default App;
