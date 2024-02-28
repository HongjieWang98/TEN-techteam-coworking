import './App.css';
import ApplicationForm from './components/CreateListing';
import LoginPage from './pages/LoginPage';
import Signup from './components/Signin';
import CreateAccount from './pages/CreateAccount';



import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/applicationform' element={<ApplicationForm/>}></Route>
        <Route path='/signup' element={<CreateAccount/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
