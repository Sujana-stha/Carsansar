// Users Listing
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button, Card, Row, Col, Input } from 'react-materialize';

const UsersListing = () => {
    return(
	    <div>
	        <div className="row">
				<div className="col s12 mt-2 mb-2 right-align">
					<NavLink to="/insert-user" className="btn waves-effect waves-light"><i className="material-icons left">add</i><span> Add User</span></NavLink>
				</div>
			</div>
            <Table>
                <thead>
                    <tr>
                    <th data-field="id">#</th>
                    <th data-field="username">Username</th>
                    <th data-field="name">Name</th>
                    <th data-field="email">Email</th>
                    <th data-field="role">Role</th>
                    <th data-field="count">Count</th>
                    <th data-field="action">Action</th>
                    <th data-field="status">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    <td>1</td>
                    <td>bmaharjan</td>
                    <td>Bikash Maharjan</td>
                    <td>bmaharjan@techtatva.co</td>
                    <td>Administrator</td>
                    <td>100</td>
                    <td>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href="#"><i className="material-icons">edit</i></a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete" href="#"><i className="material-icons">delete</i></a>
                    </td>
                    <td>
                        <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
                    </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>rtamrakar</td>
                    <td>Rupesh Tamrakar</td>
                    <td>rtamrakar@techtatva.co</td>
                    <td>Dealership</td>
                    <td>100</td>
                    <td>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href="#"><i className="material-icons">edit</i></a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete" href="#"><i className="material-icons">delete</i></a>
                    </td>
                    <td>
                        <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
                    </td>
                    </tr>
                    <tr>
                    <td>1</td>
                    <td>bmaharjan</td>
                    <td>Bikash Maharjan</td>
                    <td>bmaharjan@techtatva.co</td>
                    <td>Administrator</td>
                    <td>100</td>
                    <td>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href="#"><i className="material-icons">edit</i></a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete" href="#"><i className="material-icons">delete</i></a>
                    </td>
                    <td>
                        <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
                    </td>
                    </tr>
                    <tr>
                    <td>999</td>
                    <td>bmaharjan</td>
                    <td>Bikash Maharjan</td>
                    <td>bmaharjan@techtatva.co</td>
                    <td>Administrator</td>
                    <td>100</td>
                    <td>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href="#"><i className="material-icons">edit</i></a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete" href="#"><i className="material-icons">delete</i></a>
                    </td>
                    <td>
                        <div className="switch"><label>Inactive<input defaultChecked type="checkbox" /><span className="lever"></span>Active</label></div>
                    </td>
                    </tr>
                </tbody>
            </Table>
        </div>
	    	    
    )
}

export default UsersListing;