import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Home.css'
import NavigationBar from '../../../components/ExternalNavigationBar/NavigationBar'
import image from '../../../images/book_header.png'


function HomePage() {
  return (

    <>

      <div className='SectionWrapper TitleSection'>
        <div>
          <div className='SectionTitleHeader left'>
            Textbook Exchange Network
          </div>
          <div className='SectionSubtitleHeader left'>
            Changing the textbook game.
          </div>
          <Link to='./schoolnav'>
            <button
              type='button'
              className='btn btn-outline-primary btn-rounded left center padded'
            >
              Get Started!
            </button>
          </Link>
          {
            <Link to='./HowTo'>
              <button
                type='button'
                className='btn btn-outline-primary btn-rounded left center padded'
              >
                Learn more
              </button>
            </Link>
          }
          <div>
            <div>
              <div className='circle yellow'></div>
              <div className='circle green'></div>
              <div className='circle blue'></div>
            </div>
             <img className='BookHeaderImage' src={image} /> 
          </div>
        </div>
      </div>

      </>
  );
}

export default HomePage;