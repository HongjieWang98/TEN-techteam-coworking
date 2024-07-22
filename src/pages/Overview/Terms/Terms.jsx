import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

//import NavigationBar from '../NavigationBar/NavigationBar'
//import { stickyFooter } from '../Footer/Footer'
import './Terms.css'

class TermsItem extends Component {
  render() {
    return (
      <div className='TermsItem' style={{ float: this.props.float }}>
        {this.props.text}
      </div>
    )
  }
}

class Terms extends Component {
/*
  componentDidMount() {
    document.title = 'Terms and Conditions - TEN'
    footerDelay()
  }

  componentDidUpdate() {
    footerDelay()
  }
*/
  render() {
    return (
      <div className='terms'>
        <div className='titleTC'>
          <br />
          Terms and Conditions
        </div>
        <br />
        These Terms and Conditions apply to the purchase and selling of academic
        supplies through the Textbook Exchange Network:
        <ol className='decimal'>
          <br />
          <li>
            Textbook Exchange Network is merely a facilitator of the
            communication between the buyer and seller of textbooks. It is not
            responsible for any duly commercial procedures associated with a
            conventional bookstore.
            <ol className='lower-latin'>
              <li>We cannot issue receipts, refunds, or discounts</li>
              <li>
                We are not responsible for the condition of the goods being sold
              </li>
              <li>
                Once an item is sold, it is unable to be returned to the
                original seller
              </li>
              <li>
                We are not responsible for any issues with payments, such as
                payments being made to the wrong person
              </li>
            </ol>
          </li>
          <li>
            The provider of the software, Textbook Exchange Network, is in no
            way affiliated with any university. Tufts nor any partnered
            university holds any responsibility over TEN.{' '}
          </li>
          <li>
            The Textbook Exchange Network nor organizations using the software
            are liable for any problems that may occur.
          </li>
          <li>
            The Textbook Exchange Network is not liable for any data leaks or
            security issues that may occur.
          </li>
          <li>
            The Textbook Exchange Network reserves the right to share your data
            with its partners.{' '}
          </li>
          <li>
            If an item is not sold after two years, the seller will be emailed
            to pick up their item. If that item is not picked up within a week
            of notification, the item will be donated to TEN, and TEN may
            dispose of the item in any manner it would like.
          </li>
        </ol>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

/*
function footerDelay() {
  setTimeout(() => {
    stickyFooter(0)
  }, 1)
}
*/


export default Terms
