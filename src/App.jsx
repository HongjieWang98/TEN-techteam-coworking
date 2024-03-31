import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import { SellProvider } from './contexts/SellContext';
import CreateAccount from './pages/Account/CreateAccount';
import SuccessCreateAccount from './pages/Account/SuccessAccountCreate';

function App() {
  return (
    <Router>
      <SellProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/applicationform" element={<ApplicationForm />} />
          <Route path="/sell/list" element={<ListingPage />} />
          <Route path="/sell/confirmation" element={<ConfirmationPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/signup/success" element={<SuccessCreateAccount />} />
        </Routes>
      </SellProvider>
    </Router>
  );
}

export default App;
