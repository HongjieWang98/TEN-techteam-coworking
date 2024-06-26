/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

// eslint-disable-next-line react/prefer-stateless-function
class NavigationBarItem extends Component {
  render() {
    return (
      <div
        className={`NavigationBarItemContainer ${
          this.props.float === 'left' ? 'ItemLeft' : 'ItemRight'
        } ${this.props.class}`}>
        <Link to={this.props.link} className="NavigationBarItemAnchor">
          <div id={this.props.id} className="NavigationBarItemText">
            {this.props.text}
          </div>
        </Link>
      </div>
    );
  }
}

export default NavigationBarItem;
