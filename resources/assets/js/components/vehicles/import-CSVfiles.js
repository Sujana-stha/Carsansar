import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DropZone from 'react-dropzone';


const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div className="wr-uploader col s12">
            <div className="wr-dropzone-wrapper">
                <DropZone
                    name={field.name}
                    onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                    className="drop-zone center-align"
                    multiple={false}
                    accept="application/pdf, application/docx, application/csv"
                >
                    <i className="material-icons">cloud_upload</i><br/>
                    <span className="dropzone-text">Drag n Drop CSV Files Here !</span>
                </DropZone>
            </div>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
            <ul>
                { files.map((file, i) => <li key={i}>{file.name}</li>) }
            </ul>
            )}
      </div>
    );
}

class ImportFileForm extends Component {
    
    render() {
        const {handleSubmit} = this.props
        return (
                    <form onSubmit={ handleSubmit} className="col s12">
                        <div className="row">
                        <Field name="import"
                        label="File"
                        component={renderDropzoneInput}
                        />
                        </div>
                        <div className="row ">
                            <div className="col s12 mt-4">
                                <button className="btn cyan waves-effect waves-light" type="submit" name="action">Upload
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
        );
    }
}

export default reduxForm({
    form: 'ImportFile'
})(ImportFileForm);