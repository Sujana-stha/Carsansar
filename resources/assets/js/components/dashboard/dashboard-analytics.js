// Dashboard Analytics

import React, { Component } from 'react';
const cProgressWidth = {width: '70%'};
const dProgressWidth = {width: '40%',};
const aProgressWidth = {width: '95%',};
const bProgressWidth = {width: '10%',};


//const DashboardAnalytics = () => {
class DashboardAnalytics extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }
  
  render(){
    return(
	    <div>Dashboard
	    {/* card stats start */}
            {/*
            <div id="card-stats">
              <div className="row">
                <div className="col s12 m6 l3">
                  <div className="card">
                    <div className="card-content cyan white-text">
                      <p className="card-stats-title">
                        <i className="material-icons">person_outline</i> New Clients</p>
                      <h4 className="card-stats-number">566</h4>
                      <p className="card-stats-compare">
                        <i className="material-icons">keyboard_arrow_up</i> 15%
                        <span className="cyan text text-lighten-5">from yesterday</span>
                      </p>
                    </div>
                    <div className="card-action cyan darken-1">
                      <div id="clients-bar" className="center-align"></div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card">
                    <div className="card-content red accent-2 white-text">
                      <p className="card-stats-title">
                        <i className="material-icons">attach_money</i>Total Sales</p>
                      <h4 className="card-stats-number">$8990.63</h4>
                      <p className="card-stats-compare">
                        <i className="material-icons">keyboard_arrow_up</i> 70%
                        <span className="red-text text-lighten-5">last month</span>
                      </p>
                    </div>
                    <div className="card-action red darken-1">
                      <div id="sales-compositebar" className="center-align"></div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card">
                    <div className="card-content teal accent-4 white-text">
                      <p className="card-stats-title">
                        <i className="material-icons">trending_up</i> Today Profit</p>
                      <h4 className="card-stats-number">$806.52</h4>
                      <p className="card-stats-compare">
                        <i className="material-icons">keyboard_arrow_up</i> 80%
                        <span className="teal-text text-lighten-5">from yesterday</span>
                      </p>
                    </div>
                    <div className="card-action teal darken-1">
                      <div id="profit-tristate" className="center-align"></div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card">
                    <div className="card-content deep-orange accent-2 white-text">
                      <p className="card-stats-title">
                        <i className="material-icons">content_copy</i> New Invoice</p>
                      <h4 className="card-stats-number">1806</h4>
                      <p className="card-stats-compare">
                        <i className="material-icons">keyboard_arrow_down</i> 3%
                        <span className="deep-orange-text text-lighten-5">from last month</span>
                      </p>
                    </div>
                    <div className="card-action  deep-orange darken-1">
                      <div id="invoice-line" className="center-align"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="chart-dashboard">
              <div className="row">
                <div className="col s12 m8 l8">
                  <div className="card">
                    <div className="card-move-up waves-effect waves-block waves-light">
                      <div className="move-up cyan darken-1">
                        <div>
                          <span className="chart-title white-text">Revenue</span>
                          <div className="chart-revenue cyan darken-2 white-text">
                            <p className="chart-revenue-total">$4,500.85</p>
                            <p className="chart-revenue-per">
                              <i className="material-icons">arrow_drop_up</i> 21.80 %</p>
                          </div>
                          <div className="switch chart-revenue-switch right">
                            <label className="cyan-text text-lighten-5">
                              Month
                              <input type="checkbox" />
                              <span className="lever"></span> Year
                            </label>
                          </div>
                        </div>
                        <div className="trending-line-chart-wrapper">
                          <canvas id="trending-line-chart" height="70"></canvas>
                        </div>
                      </div>
                    </div>
                    <div className="card-content">
                      <a className="btn-floating btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                        <i className="material-icons activator">filter_list</i>
                      </a>
                      <div className="col s12 m3 l3">
                        <div id="doughnut-chart-wrapper">
                          <canvas id="doughnut-chart" height="200"></canvas>
                          <div className="doughnut-chart-status">4500
                            <p className="ultra-small center-align">Sold</p>
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m2 l2">
                        <ul className="doughnut-chart-legend">
                          <li className="mobile ultra-small">
                            <span className="legend-color"></span>Mobile</li>
                          <li className="kitchen ultra-small">
                            <span className="legend-color"></span> Kitchen</li>
                          <li className="home ultra-small">
                            <span className="legend-color"></span> Home</li>
                        </ul>
                      </div>
                      <div className="col s12 m5 l6">
                        <div className="trending-bar-chart-wrapper">
                          <canvas id="trending-bar-chart" height="90"></canvas>
                        </div>
                      </div>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Revenue by Month
                        <i className="material-icons right">close</i>
                      </span>
                      <table className="responsive-table">
                        <thead>
                          <tr>
                            <th data-field="id">ID</th>
                            <th data-field="month">Month</th>
                            <th data-field="item-sold">Item Sold</th>
                            <th data-field="item-price">Item Price</th>
                            <th data-field="total-profit">Total Profit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>January</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>February</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>March</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>April</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>May</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>June</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>July</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>August</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Septmber</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Octomber</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>November</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>December</td>
                            <td>122</td>
                            <td>100</td>
                            <td>$122,00.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col s12 m4 l4">
                  <div className="card">
                    <div className="card-move-up teal accent-4 waves-effect waves-block waves-light">
                      <div className="move-up">
                        <p className="margin white-text">Browser Stats</p>
                        <canvas id="trending-radar-chart" height="114"></canvas>
                      </div>
                    </div>
                    <div className="card-content  teal">
                      <a className="btn-floating btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                        <i className="material-icons activator">done</i>
                      </a>
                      <div className="line-chart-wrapper">
                        <p className="margin white-text">Revenue by country</p>
                        <canvas id="line-chart" height="114"></canvas>
                      </div>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Revenue by country
                        <i className="material-icons right">close</i>
                      </span>
                      <table className="responsive-table">
                        <thead>
                          <tr>
                            <th data-field="country-name">Country Name</th>
                            <th data-field="item-sold">Item Sold</th>
                            <th data-field="total-profit">Total Profit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>USA</td>
                            <td>65</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>UK</td>
                            <td>76</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>Canada</td>
                            <td>65</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>Brazil</td>
                            <td>76</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>India</td>
                            <td>65</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>France</td>
                            <td>76</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>Austrelia</td>
                            <td>65</td>
                            <td>$452.55</td>
                          </tr>
                          <tr>
                            <td>Russia</td>
                            <td>76</td>
                            <td>$452.55</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="work-collections">
              <div className="row">
                <div className="col s12 m12 l6">
                  <ul id="projects-collection" className="collection z-depth-1">
                    <li className="collection-item avatar">
                      <i className="material-icons cyan circle">card_travel</i>
                      <h6 className="collection-header m-0">Projects</h6>
                      <p>Your Favorites</p>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s6">
                          <p className="collections-title">Web App</p>
                          <p className="collections-content">AEC Company</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat cyan">Development</span>
                        </div>
                        <div className="col s3">
                          <div id="project-line-1"></div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s6">
                          <p className="collections-title">Mobile App for Social</p>
                          <p className="collections-content">iSocial App</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat red accent-2">UI/UX</span>
                        </div>
                        <div className="col s3">
                          <div id="project-line-2"></div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s6">
                          <p className="collections-title">Website</p>
                          <p className="collections-content">MediTab</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat teal accent-4">Marketing</span>
                        </div>
                        <div className="col s3">
                          <div id="project-line-3"></div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s6">
                          <p className="collections-title">AdWord campaign</p>
                          <p className="collections-content">True Line</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat deep-orange accent-2">SEO</span>
                        </div>
                        <div className="col s3">
                          <div id="project-line-4"></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m12 l6">
                  <ul id="issues-collection" className="collection z-depth-1">
                    <li className="collection-item avatar">
                      <i className="material-icons red accent-2 circle">bug_report</i>
                      <h6 className="collection-header m-0">Issues</h6>
                      <p>Assigned to you</p>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#102</strong> Home Page</p>
                          <p className="collections-content">Web Project</p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat deep-orange accent-2">P1</span>
                        </div>
                        
                        <div className="col s3">
                          <div className="progress">
                            <div className="determinate" style={cProgressWidth}></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#108</strong> API Fix</p>
                          <p className="collections-content">API Project </p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat cyan">P2</span>
                        </div>
                        
                        <div className="col s3">
                          <div className="progress">
                            <div className="determinate" style={dProgressWidth}></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#205</strong> Profile page css</p>
                          <p className="collections-content">New Project </p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat red accent-2">P3</span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div className="determinate" style={aProgressWidth}></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#188</strong> SAP Changes</p>
                          <p className="collections-content">SAP Project</p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat teal accent-4">P1</span>
                        </div>
                        
                        <div className="col s3">
                          <div className="progress">
                            <div className="determinate" style={bProgressWidth}></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="card-widgets">
              <div className="row">
                <div className="col s12 m4 l4">
                  <ul id="task-card" className="collection with-header">
                    <li className="collection-header teal accent-4">
                      <h4 className="task-card-title">My Task</h4>
                      <p className="task-card-date">Sept 16, 2017</p>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task1" />
                      <label htmlFor="task1">Create Mobile App UI.
                        <a href="#" className="secondary-content">
                          <span className="ultra-small">Today</span>
                        </a>
                      </label>
                      <span className="task-cat cyan">Mobile App</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task2" />
                      <label htmlFor="task2">Check the new API standerds.
                        <a href="#" className="secondary-content">
                          <span className="ultra-small">Monday</span>
                        </a>
                      </label>
                      <span className="task-cat red accent-2">Web API</span>
                    </li>
                    <li className="collection-item dismissable">
                     
                      <input type="checkbox" id="task3" value={this.state.value} onChange={this.handleChange} />
                      <label htmlFor="task3">Check the new Mockup of ABC.
                        <a href="#" className="secondary-content">
                          <span className="ultra-small">Wednesday</span>
                        </a>
                      </label>
                      <span className="task-cat teal accent-4">Mockup</span>
                    </li>
                    <li className="collection-item dismissable">
                     
                      <input type="checkbox" id="task4" value={this.state.value} onChange={this.handleChange} disabled="disabled" />
                      <label htmlFor="task4">I did it !</label>
                      <span className="task-cat deep-orange accent-2">Mobile App</span>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m12 l4">
                  <div id="flight-card" className="card">
                    <div className="card-header deep-orange accent-2">
                      <div className="card-title">
                        <h4 className="flight-card-title">Flight</h4>
                        <p className="flight-card-date">June 18, Thu 04:50</p>
                      </div>
                    </div>
                    <div className="card-content-bg white-text">
                      <div className="card-content">
                        <div className="row flight-state-wrapper">
                          <div className="col s5 m5 l5 center-align">
                            <div className="flight-state">
                              <h4 className="margin">LDN</h4>
                              <p className="ultra-small">London</p>
                            </div>
                          </div>
                          <div className="col s2 m2 l2 center-align">
                            <i className="material-icons flight-icon">local_airport</i>
                          </div>
                          <div className="col s5 m5 l5 center-align">
                            <div className="flight-state">
                              <h4 className="margin">SFO</h4>
                              <p className="ultra-small">San Francisco</p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s6 m6 l6 center-align">
                            <div className="flight-info">
                              <p className="small">
                                <span className="grey-text text-lighten-4">Depart:</span> 04.50</p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">Flight:</span> IB 5786</p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">Terminal:</span> B</p>
                            </div>
                          </div>
                          <div className="col s6 m6 l6 center-align flight-state-two">
                            <div className="flight-info">
                              <p className="small">
                                <span className="grey-text text-lighten-4">Arrive:</span> 08.50</p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">Flight:</span> IB 5786</p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">Terminal:</span> C</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m4 l4">
                  <div id="profile-card" className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src="images/gallary/3.png" alt="user bg" />
                    </div>
                    <div className="card-content">
                      <img src="images/avatar/avatar-7.png" alt="" className="circle responsive-img activator card-profile-image cyan lighten-1 padding-2" />
                      <a className="btn-floating activator btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                        <i className="material-icons">edit</i>
                      </a>
                      <span className="card-title activator grey-text text-darken-4">Roger Waters</span>
                      <p>
                        <i className="material-icons">perm_identity</i> Project Manager</p>
                      <p>
                        <i className="material-icons">perm_phone_msg</i> +1 (612) 222 8989</p>
                      <p>
                        <i className="material-icons">email</i> yourmail@domain.com</p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Roger Waters
                        <i className="material-icons right">close</i>
                      </span>
                      <p>Here is some more information about this card.</p>
                      <p>
                        <i className="material-icons">perm_identity</i> Project Manager</p>
                      <p>
                        <i className="material-icons">perm_phone_msg</i> +1 (612) 222 8989</p>
                      <p>
                        <i className="material-icons">email</i> yourmail@domain.com</p>
                      <p>
                        <i className="material-icons">cake</i> 18th June 1990
                      </p>
                      <p>
                      </p>
                      <p>
                        <i className="material-icons">airplanemode_active</i> BAR - AUS
                      </p>
                      <p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                
                <div className="col s12 m12 l4 item">
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <a href="#">
                        <img src="images/gallary/3.png" alt="item-img" />
                      </a>
                      <h4 className="card-title text-shadow m-0">Card Title</h4>
                    </div>
                    <ul className="card-action-buttons">
                      <li>
                        <a className="btn-floating waves-effect waves-light teal accent-4">
                          <i className="material-icons">share</i>
                        </a>
                      </li>
                      <li>
                        <a className="btn-floating waves-effect waves-light red accent-2">
                          <i className="material-icons activator">info_outline</i>
                        </a>
                      </li>
                    </ul>
                    <div className="card-content">
                      <a href="#!"></a>
                      <p className="row mb-1">
                        <small className="right">
                          <a href="#!">
                            <span className="new badge red accent-2" data-badge-caption="UI/UX"></span>
                            <span className="new badge cyan m-0" data-badge-caption="Web Design"></span>
                          </a>
                        </small>
                        <small className="left">18th June, 2017</small>
                      </p>
                      <p className="item-post-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">
                        <i className="material-icons right">close</i> Apple MacBook Pro A1278 13</span>
                      <p>Here is some more information about this item that is only revealed once clicked on.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col s12 m12 l4 item product">
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <a href="#" className="btn-floating btn-large btn-price waves-effect waves-light teal accent-4">$189</a>
                      <a href="#">
                        <img src="images/gallary/11.png" alt="item-img" />
                      </a>
                    </div>
                    <ul className="card-action-buttons">
                      <li>
                        <a className="btn-floating waves-effect waves-light cyan">
                          <i className="material-icons">add_shopping_cart</i>
                        </a>
                      </li>
                      <li>
                        <a className="btn-floating waves-effect waves-light red accent-2">
                          <i className="material-icons">favorite</i>
                        </a>
                      </li>
                      <li>
                        <a className="btn-floating waves-effect waves-light deep-orange accent-2">
                          <i className="material-icons activator">info_outline</i>
                        </a>
                      </li>
                    </ul>
                    <div className="card-content">
                      <div className="row">
                        <div className="col s12">
                          <p className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">Apple MacBook Pro A1278 13"</a></p>
                          <p>Some more information about this product features and specification.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">
                        <i className="material-icons right">close</i> Apple MacBook Pro A1278 13"</span>
                      <p>Here is some more information about this item that is only revealed once clicked on.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col s12 m12 l4">
                  <div className="map-card">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <div id="map-canvas" data-lat="40.747688" data-lng="-74.004142"></div>
                      </div>
                      <div className="card-content">
                        <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                          <i className="material-icons">pin_drop</i>
                        </a>
                        <h4 className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">Company Name LLC</a>
                        </h4>
                        <p className="blog-post-content">Some more information about this company.</p>
                      </div>
                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Company Name LLC
                          <i className="material-icons right">close</i>
                        </span>
                        <p>Here is some more information about this company. As a creative studio we believe no client is too big nor too small to work with us to obtain good advantage.By combining the creativity of artists with the precision of engineers we develop custom solutions that achieve results.Some more information about this company.</p>
                        <p>
                          <i className="material-icons cyan-text text-darken-2">perm_identity</i> Manager Name</p>
                        <p>
                          <i className="material-icons cyan-text text-darken-2">business</i> 125, ABC Street, New Yourk, USA</p>
                        <p>
                          <i className="material-icons cyan-text text-darken-2">perm_phone_msg</i> +1 (612) 222 8989</p>
                        <p>
                          <i className="material-icons cyan-text text-darken-2">email</i> support@pixinvent.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>*/}
            
	    </div>
	    	    
    );
    }
}

export default DashboardAnalytics;