import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';
import { SellProvider } from './contexts/SellContext';
import Profile from './pages/Profile';
<<<<<<< Updated upstream

import CreateAccount from './pages/CreateAccount';
=======
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <SellProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/applicationform" element={<ApplicationForm />} />

          <Route path="/sell/list" element={<ListingPage />}></Route>
          <Route path="/sell/confirmation" element={<ConfirmationPage />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>

          <Route path="/sell/list" element={<ListingPage />} />
          <Route path="/sell/confirmation" element={<ConfirmationPage />} />
<<<<<<< Updated upstream
          <Route path="/signup" element={<CreateAccount />} />

=======
          <Route path='/profile' element={<Profile/>}></Route>
>>>>>>> Stashed changes
        </Routes>
      </SellProvider>
    </Router>
  );
}

export default App;
