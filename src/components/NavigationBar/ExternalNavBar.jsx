import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../../images/logo2.png';
import NavigationBarItem from './NavigationBarItem';

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
      <NavigationBarItem float="Left" text="Get started" link="/school" />
      <NavigationBarItem float="Left" text="How it works" link="/how" />
      <NavigationBarItem float="Left" text="Inventory" link="/publicinventory" />
      <NavigationBarItem float="Left" text="Home" link="/" />
    </div>
  );
}

export default ExternalNavigationBar;
