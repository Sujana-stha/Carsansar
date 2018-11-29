// Insert User

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Row, Col, Input } from 'react-materialize';


const InsertUser = () => {
    return(
	    <div>
            <Row>
				<div className="col s12 mt-2 mb-2 right-align">
					<NavLink to="/users" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> All Users</span></NavLink>
				</div>
			</Row>
	    	<h4 className="header2">Add New User</h4>
	    	<div className="card-panel">
            <Row>
                <Input s={6} label="First Name" />
                <Input s={6} label="Last Name" />
                <Input s={6} label="Company ID/Dealership ID" defaultValue="" />
                <Input s={6} label="Company/Dealership Name" defaultValue="" />
                <Input s={12} label="Username" defaultValue="" />
                <Input type="password" label="Password" s={12} />
                <Input type="email" label="Email" s={12} />
                <Button waves='light'>Add New User</Button>
             </Row>
			  
			  </div>
        
	    </div>
	)
}

export default InsertUser;