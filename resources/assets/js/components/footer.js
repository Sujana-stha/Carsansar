// Footer


import React, { Component } from 'react';

const Footer = () => {
    return(
	    <footer className="page-footer">
	    {/*
      <div className="container">
        <div className="row section">
          <div className="col l6 s12">
            <h5 className="white-text">World Market</h5>
            <p className="grey-text text-lighten-4">World map, world regions, countries and cities.</p>
            <div id="world-map-markers"></div>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Sales by Country</h5>
            <p className="grey-text text-lighten-4">A sample polar chart to show sales by country.</p>
            <div id="polar-chart-holder">
              <canvas id="polar-chart-country" width="200"></canvas>
            </div>
          </div>
        </div>
      </div>*/}
      <div className="page-footer">
        <div className="footer-copyright">
          <div className="container">
            <span>&copy; 2018
              <script type="text/javascript">
                document.write(new Date().getFullYear());
              </script> <a className="grey-text text-lighten-2" href="#" >whrepo</a> </span>
            {/*<span className="right hide-on-small-only"> Design and Developed by <a className="grey-text text-lighten-2" href="#">Developers</a></span>*/}
          </div>
        </div>
      </div>
    </footer>
	    
	)
}

export default Footer;