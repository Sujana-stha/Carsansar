// Floating Action Button

import React from 'react';

var fltBtnStyle = {
  bottom: '50px',
  right: '19px'
};

const FloatingActionButton = () => {
  return (
    <div className="fixed-action-btn " style={fltBtnStyle}>
      <a className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow">
        <i className="material-icons">add</i>
      </a>
      <ul>
        <li>
          <a href="css-helpers.html" className="btn-floating blue">
            <i className="material-icons">help_outline</i>
          </a>
        </li>
        <li>
          <a href="cards-extended.html" className="btn-floating green">
            <i className="material-icons">widgets</i>
          </a>
        </li>
        <li>
          <a href="app-calendar.html" className="btn-floating amber">
            <i className="material-icons">today</i>
          </a>
        </li>
        <li>
          <a href="app-email.html" className="btn-floating red">
            <i className="material-icons">mail_outline</i>
          </a>
        </li>
      </ul>
    </div>

  )
}

export default FloatingActionButton;