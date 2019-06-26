import React, { Component } from 'react';
import ImportForm from '../../components/vehicles/import-CSVfiles'
import { connect } from 'react-redux';
import store from '../../store';
import { requestImports } from '../../actions/deals-action'

class ImportFileForm extends Component {
    
    onSubmit(values) {
        console.log('impp',values);
        this.props.requestImports(values);
    }
    render() {
        return (
            <div className="card-panel mt-4">
                <h4 className="wr-header2">Upload File</h4>
                <div className="row">
                    <ImportForm onSubmit={this.onSubmit.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default connect(null, {requestImports})(ImportFileForm);