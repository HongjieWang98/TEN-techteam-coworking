import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavigationBar.css'
import logo from '../../images/logo2.png'

class NavigationBarItem extends Component {
  render() {
    return (
      <div
        className={
          'NavigationBarItemContainer ' +
          (this.props.float === 'left' ? 'ItemLeft' : 'ItemRight') +
          ' ' +
          this.props.class
        }
      >
        <Link to={this.props.link} className='NavigationBarItemAnchor'>
          <div id={this.props.id} className='NavigationBarItemText'>
            {this.props.text}
          </div>
        </Link>
      </div>
    )
  }
}

class NavigationBar extends Component {
  render() {
    return (
      <div className='NavigationBarContainer'>
        <div
          className='NavigationBarItemContainer'
          style={{
            float: 'left',
            padding: '5px 0',
          }}
        >
          <Link to='/' className='NavigationBarItemAnchor'>
            <img src={logo} className='NavigationBarImage' />
          </Link>
        </div>
        <NavigationBarItem
          float='Left'
          text='Get started'
          link='/Home/SchoolNav'
          /*id='nav-your-listings'*/
        />
        <NavigationBarItem
          float='Left'
          text='How it works'
          link='/Home/HowTo'
          /*class='NoDisplayAtPhone600'
          id='nav-about' */
        />
        <NavigationBarItem
          float='Left'
          text='Home'
          link='/Home'
          /*class='NoDisplayAtPhone480'
          id='nav-members'*/
        />
      </div>
    )
  }
}

export default NavigationBar