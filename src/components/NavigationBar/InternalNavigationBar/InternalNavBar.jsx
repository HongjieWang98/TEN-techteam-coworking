import { Link } from 'react-router-dom';
import '../NavigationBar.css';
import logo from '../../../images/logo2.png';
import NavigationBarItem from '../NavigationBarDef';

function InternalNavigationBar() {
  // **** @todo Fix the linking of the nav bar items ***
  return (
    <div className="NavigationBarContainer" style={{ backgroundColor: '#DBEEFF' }}>
      <div
        className="NavigationBarItemContainer"
        style={{
          float: 'left',
          padding: '5px 0'
        }}>
        <Link to="/" className="NavigationBarItemAnchor">
          <img src={logo} className="NavigationBarImage" alt="TEN Logo" />
        </Link>
      </div>
      <NavigationBarItem
        float="Left"
        text="My account"
        link="/profile"
        /* id='nav-your-listings' */
      />
      <NavigationBarItem
        float="Left"
        text="Sell"
        link="/sell"
        /* class='NoDisplayAtPhone600'
        id='nav-about' */
      />
      <NavigationBarItem
        float="Left"
        text="Buy"
        link="/buy"
        /* class='NoDisplayAtPhone480'
        id='nav-members' */
      />
      <NavigationBarItem
        float="Left"
        text="Home"
        link="/home"
        /* class='NoDisplayAtPhone480'
        id='nav-members' */
      />
    </div>
  );
}

export default InternalNavigationBar;
