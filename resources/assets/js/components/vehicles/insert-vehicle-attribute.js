  // Insert Vehicle

  import React, { Component } from 'react';
  import {CardPanel, Row } from 'react-materialize';

  const InsertVehicleAttribute = () => {
    return(
      <div>
        <h4 class="header2">Add New Vehicle Attribute</h4>
        <CardPanel>
          <Row>
            <form className="col s12">
              <Row>
                <div className="input-field col s12">
                  <input id="v_a_name" type="text" className="validate" />
                  <label htmlFor="v_a_name">Vehicle Attribute Name</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12">
                  <textarea id="v_a_description" className="materialize-textarea"></textarea>
                  <label htmlFor="v_a_description">Vehicle Attribute Description</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12">
                  <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </Row>
            </form>
          </Row>
        </CardPanel>
      
      </div>
    )
  }
    
  export default InsertVehicleAttribute;