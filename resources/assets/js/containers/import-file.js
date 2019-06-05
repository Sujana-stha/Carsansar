import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DropZone from 'react-dropzone';
import * as api from '../api/deals-api'

class ImportFileForm extends Component {
    
    renderFileInputField({input, label, meta: {touched, error}}) {
        
        return (
            <div className="wr-uploader col s12">
                <div className="wr-dropzone-wrapper">
                    <DropZone
                    onDrop={(e)=> {
                        console.log('file', e)
                        input.onChange(e)
                    }}
                    className="drop-zone center-align"
                    accept="application/pdf, application/docx, application/csv"
                    >
                        <i className="material-icons">cloud_upload</i><br/>
                        <span className="dropzone-text">Drag n Drop Files Here !</span>
                    </DropZone>
                </div>
            </div>
        )
    }
    onSubmit(values) {
        console.log(values);
        api.postDocuments(values)
    }
    render() {
        return (
            <div className="card-panel mt-4">
                <h4 className="wr-header2">Upload File</h4>
                <div className="row">
                    <form onSubmit={ this.props.handleSubmit((event)=>this.onSubmit(event))} className="col s12">
                        <Field name="import"
                        label="File"
                        component={this.renderFileInputField}
                        />
                        <div className="row ">
                            <div className="col s12 mt-4">
                                <button className="btn cyan waves-effect waves-light" type="submit" name="action">Upload
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'ImportFile'
})(ImportFileForm);