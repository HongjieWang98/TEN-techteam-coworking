import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import ListingPage from './pages/Sell/ListingPage';
import ConfirmationPage from './pages/Sell/ConfirmationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
        <Route path='/sell/list' element={<ListingPage />}></Route>
        <Route path='/sell/confirmation' element={<ConfirmationPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
