  // Insert Vehicle

  import React, { Component } from 'react';

  const InsertVehicleAttribute = () => {
    return(
      <div>
        <h4 class="header2">Add New Vehicle Attribute</h4>
        <div className="card-panel">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input id="v_a_name" type="text" className="validate" />
                  <label htmlFor="v_a_name">Vehicle Attribute Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="v_a_description" className="materialize-textarea"></textarea>
                  <label htmlFor="v_a_description">Vehicle Attribute Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Save
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
      </div>
    )
  }
    
  export default InsertVehicleAttribute;