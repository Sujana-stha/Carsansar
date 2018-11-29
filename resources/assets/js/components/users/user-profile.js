// User Profile
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button, Card, Row, Col, Input, Collapsible, CollapsibleItem } from 'react-materialize';


const UserProfile = () => {
    return(
	    <div>
            <h4 className="header2">User Profile</h4>
            

            <section id="content">
                <div className="container">
                    <div id="profile-page" className="section">
                    <Row>
                        <Input s={6} label="First Name" defaultValue="Bikash" />
                        <Input s={6} label="Last Name" defaultValue="Maharjan"/>
                        <Input s={6} label="Company ID/Dealership ID" defaultValue="0338" />
                        <Input s={6} label="Company/Dealership Name" defaultValue="Techtatva" />
                        <Input s={12} label="Username cannot be changed" defaultValue="bmaharjan" disabled/>
                        <Button waves='light'>Change Password</Button>
                        
                                <Input type="password" label="Current Password" s={12} />
                                <Input type="password" label="New Password" s={12} />
                                <Input type="password" label="Retype New Password" s={12} />
                            <div className="clearfix"></div>
                        {/* <Collapsible>
                            <CollapsibleItem header="First">
                                <Input type="password" label="Current Password" s={12} />
                                <Input type="password" label="New Password" s={12} />
                                <Input type="password" label="Retype New Password" s={12} />
                            </CollapsibleItem>
                        </Collapsible> */}
                        
                        <Input type="email" label="Email" s={12} defaultValue="bmaharjan@techtatva.co" />
                        <Button waves='light'>Update User</Button>
                    </Row>
                    </div>
                </div>
            </section>

	   </div>
	    	    
    )
}

export default UserProfile;