import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../../images/logo2.png';
import NavigationBarItem from './NavigationBarDef';

function ExternalNavigationBar() {
  return (
    <div className="NavigationBarContainer" style={{ backgroundColor: '#fff' }}>
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
        text="Get started"
        link="/home/schoolnav"
        /* id='nav-your-listings' */
      />
      <NavigationBarItem
        float="Left"
        text="How it works"
        link="/home/learn"
        /* class='NoDisplayAtPhone600'
      id='nav-about' */
      />
      <NavigationBarItem
        float="Left"
        text="Home"
        link="/"
        /* class='NoDisplayAtPhone480'
      id='nav-members' */
      />
    </div>
  );
}

export default ExternalNavigationBar;
