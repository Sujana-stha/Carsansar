// User Profile
import React from 'react';
import { NavLink } from 'react-router-dom';


const UserProfile = () => {
    return(
	    <div>
            <h4 className="header2">User Profile</h4>
            <section id="content">
                <div className="container">
                    <div id="profile-page" className="section">
                    <div className="row">
                        <div className="form-field col s6">
                            <input type="text" defaultValue="Bikash"/>
                            <label>First Name</label>
                        </div>
                        <div className="form-field col s6">
                            <input type="text" defaultValue="Maharjan"/>
                            <label>Last Name</label>
                        </div>
                        <div className="form-field col s6">
                            <input type="text" defaultValue="0338"/>
                            <label>Company ID/Dealership ID</label>
                        </div>
                        <div className="form-field col s6">
                            <input type="text" defaultValue="Techtatva"/>
                            <label>Company/Dealership Name</label>
                        </div>
                        <div className="form-field col s12">
                            <input type="text" defaultValue="bmaharjan" disabled/>
                            <label>Username cannot be changed</label>
                        </div>
                        <button className='btn waves-effect waves-light'>Change Password</button>
                        <div className="form-field col s12">
                            <input type="password"/>
                            <label>Current Password</label>
                        </div>
                        <div className="form-field col s12">
                            <input type="password"/>
                            <label>New Password</label>
                        </div>
                        <div className="form-field col s12">
                            <input type="password"/>
                            <label>Retype New Password</label>
                        </div>
                               
                        <div className="clearfix"></div>
                        <div className="form-field col s12">
                            <input type="email" defaultValue="bmaharjan@techtatva.co"/>
                            <label>Email</label>
                        </div>
                        <button className='btn waves-effect waves-light'>Update User</button>
                    </div>
                    </div>
                </div>
            </section>
	   </div>
	    	    
    )
}

export default UserProfile;