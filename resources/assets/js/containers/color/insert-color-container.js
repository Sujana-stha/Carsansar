// Insert Color

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { History } from 'react-router-dom';


const ADD_COLOR ="api/colors/";

class InsertColorContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			colorCd:'',
			colorDesc:''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		const newColor = {
			color_cd: this.state.colorCd,
			color_desc: this.state.colorDesc
		}

		fetch(ADD_COLOR, {
			method:'post',
			/* headers are important*/
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
				
			body: JSON.stringify(newColor)
		})
		.then(response => {
				return response.json();
		})
		.then(this.props.history.push('/color'))

	}
	
	

	render(){
		return(
			<div>
				<div className="row">
                    <div className="col s12 mt-2 mb-2 right-align">
                        <NavLink to="/color" className="btn waves-effect waves-light"><i className="material-icons left">view_list</i><span> All Colors</span></NavLink>
                    </div>
                </div>
				<h4 className="header2">Add New Color</h4>
				<div className="card-panel">
					<div className="row">
						<form className="col s12" onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="input-field col s12">
									<input 
										id="v_color_code" 
										type="text" 
										
										name="colorCd"
										value={this.state.colorCd}
            				onChange={this.handleInputChange} />
									<label htmlFor="v_color_code">Color Code</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<input 
										id="v_color_desc" 
										type="text"
										
										name="colorDesc"
										value={this.state.colorDesc}
										onChange={this.handleInputChange} />
									<label htmlFor="v_color_desc">Color Name</label>			          
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
										<i className="material-icons right">send</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default InsertColorContainer;