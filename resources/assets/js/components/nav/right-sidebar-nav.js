// Left Sidebar Nav

import React, { Component } from 'react';

const RightSidebarNav = () => {
    return(
        <aside id="right-sidebar-nav">
          <ul id="chat-out" className="side-nav rightside-navigation">
            <li className="li-hover">
              <div className="row">
                <div className="col s12 border-bottom-1 mt-5">
                  <ul className="tabs">
                    <li className="tab col s4">
                      <a href="#activity" className="active">
                        <span className="material-icons">graphic_eq</span>
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#chatapp">
                        <span className="material-icons">face</span>
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#settings">
                        <span className="material-icons">settings</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="settings" className="col s12">
                  <h6 className="mt-5 mb-3 ml-3">GENERAL SETTINGS</h6>
                  <ul className="collection border-none">
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Notifications</span>
                        <div className="switch right">
                          <label>
                            <input defaultChecked type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>Use checkboxes when looking for yes or no answers.</p>
                    </li>
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Show recent activity</span>
                        <div className="switch right">
                          <label>
                            <input defaultChecked type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
                    </li>
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Notifications</span>
                        <div className="switch right">
                          <label>
                            <input type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>Use checkboxes when looking for yes or no answers.</p>
                    </li>
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Show recent activity</span>
                        <div className="switch right">
                          <label>
                            <input type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
                    </li>
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Show your emails</span>
                        <div className="switch right">
                          <label>
                            <input type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>Use checkboxes when looking for yes or no answers.</p>
                    </li>
                    <li className="collection-item border-none">
                      <div className="m-0">
                        <span className="font-weight-600">Show Task statistics</span>
                        <div className="switch right">
                          <label>
                            <input type="checkbox" />
                            <span className="lever"></span>
                          </label>
                        </div>
                      </div>
                      <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
                    </li>
                  </ul>
                </div>
                <div id="chatapp" className="col s12">
                  <div className="collection border-none">
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-1.png" alt="" className="circle cyan" />
                      <span className="line-height-0">Elizabeth Elliott </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">5.00 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Thank you </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-2.png" alt="" className="circle deep-orange accent-2" />
                      <span className="line-height-0">Mary Adams </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">4.14 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Hello Boo </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-3.png" alt="" className="circle teal accent-4" />
                      <span className="line-height-0">Caleb Richards </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">9.00 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Keny ! </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-4.png" alt="" className="circle cyan" />
                      <span className="line-height-0">June Lane </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">4.14 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Ohh God </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-5.png" alt="" className="circle red accent-2" />
                      <span className="line-height-0">Edward Fletcher </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">5.15 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Love you </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-6.png" alt="" className="circle deep-orange accent-2" />
                      <span className="line-height-0">Crystal Bates </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">8.00 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Can we </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-7.png" alt="" className="circle cyan" />
                      <span className="line-height-0">Nathan Watts </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">9.53 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Great! </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-8.png" alt="" className="circle red accent-2" />
                      <span className="line-height-0">Willard Wood </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">4.20 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Do it </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-9.png" alt="" className="circle teal accent-4" />
                      <span className="line-height-0">Ronnie Ellis </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">5.30 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Got that </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-1.png" alt="" className="circle cyan" />
                      <span className="line-height-0">Gwendolyn Wood </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">4.34 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Like you </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-2.png" alt="" className="circle red accent-2" />
                      <span className="line-height-0">Daniel Russell </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">12.00 AM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Thank you </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-3.png" alt="" className="circle teal accent-4" />
                      <span className="line-height-0">Sarah Graves </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">11.14 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Okay you </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-4.png" alt="" className="circle red accent-2" />
                      <span className="line-height-0">Andrew Hoffman </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">7.30 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Can do </p>
                    </a>
                    <a href="#!" className="collection-item avatar border-none">
                      <img src="images/avatar/avatar-5.png" alt="" className="circle cyan" />
                      <span className="line-height-0">Camila Lynch </span>
                      <span className="medium-small right blue-grey-text text-lighten-3">2.00 PM</span>
                      <p className="medium-small blue-grey-text text-lighten-3">Leave it </p>
                    </a>
                  </div>
                </div>
                <div id="activity" className="col s12">
                  <h6 className="mt-5 mb-3 ml-3">RECENT ACTIVITY</h6>
                  <div className="activity">
                    <div className="col s3 mt-2 center-align recent-activity-list-icon">
                      <i className="material-icons white-text icon-bg-color deep-purple lighten-2">add_shopping_cart</i>
                    </div>
                    <div className="col s9 recent-activity-list-text">
                      <a href="#" className="deep-purple-text medium-small">just now</a>
                      <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Jim Doe Purchased new equipments for zonal office.</p>
                    </div>
                    <div className="recent-activity-list chat-out-list row mb-0">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon">
                        <i className="material-icons white-text icon-bg-color cyan lighten-2">airplanemode_active</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="cyan-text medium-small">Yesterday</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Your Next flight for USA will be on 15th August 2015.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list chat-out-list row mb-0">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon medium-small">
                        <i className="material-icons white-text icon-bg-color green lighten-2">settings_voice</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="green-text medium-small">5 Days Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Natalya Parker Send you a voice mail for next conference.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list chat-out-list row mb-0">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon">
                        <i className="material-icons white-text icon-bg-color amber lighten-2">store</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="amber-text medium-small">1 Week Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Jessy Jay open a new store at S.G Road.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list row">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon">
                        <i className="material-icons white-text icon-bg-color deep-orange lighten-2">settings_voice</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="deep-orange-text medium-small">2 Week Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">voice mail for conference.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list chat-out-list row mb-0">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon medium-small">
                        <i className="material-icons white-text icon-bg-color brown lighten-2">settings_voice</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="brown-text medium-small">1 Month Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Natalya Parker Send you a voice mail for next conference.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list chat-out-list row mb-0">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon">
                        <i className="material-icons white-text icon-bg-color deep-purple lighten-2">store</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="deep-purple-text medium-small">3 Month Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Jessy Jay open a new store at S.G Road.</p>
                      </div>
                    </div>
                    <div className="recent-activity-list row">
                      <div className="col s3 mt-2 center-align recent-activity-list-icon">
                        <i className="material-icons white-text icon-bg-color grey lighten-2">settings_voice</i>
                      </div>
                      <div className="col s9 recent-activity-list-text">
                        <a href="#" className="grey-text medium-small">1 Year Ago</a>
                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">voice mail for conference.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </aside>    )
}

export default RightSidebarNav;