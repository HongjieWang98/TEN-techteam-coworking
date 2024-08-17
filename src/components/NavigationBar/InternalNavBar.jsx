import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../../images/logo2.png';
import NavigationBarItem from './NavigationBarItem';

function InternalNavigationBar() {
  // **** @todo Fix the linking of the nav bar items ***
  return (
    <div className="NavigationBarContainer" style={{ backgroundColor: '#DBEEFF' }}>
      <div
        className="NavigationBarItemContainer"
        style={{
          float: 'left',
          padding: '5px 0'
        }}
      >
        <Link to="/" className="NavigationBarItemAnchor">
          <img src={logo} className="NavigationBarImage" alt="TEN Logo" />
        </Link>
      </div>
      <NavigationBarItem float="Left" text="My account" link="/profile" />
      <NavigationBarItem float="Left" text="Sell" link="/sell/list" />
      <NavigationBarItem float="Left" text="Buy" link="/inventory" />
      <NavigationBarItem float="Left" text="How to" link="/how" />
      <NavigationBarItem float="Left" text="Home" link="/" />
    </div>
  );
}

export default InternalNavigationBar;
