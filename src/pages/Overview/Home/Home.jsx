import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image from '../../../images/book_header.png';

function HomePage() {
  return (
    <div className="SectionWrapper TitleSection">
      <div>
        <div className="SectionTitleHeader left">Textbook Exchange Network</div>
        <div className="SectionSubtitleHeader left">Changing the textbook game.</div>
        <Link to="../Home/schoolnav">
          <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
            Get Started!
          </button>
        </Link>
        <Link to="../Home/HowTo">
          <button type="button" className="btn btn-outline-primary btn-rounded left center padded">
            Learn more
          </button>
        </Link>
        <div>
          <div>
            <div className="circle yellow" />
            <div className="circle green" />
            <div className="circle blue" />
          </div>
          <img className="BookHeaderImage" src={image} alt="Textbook" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
