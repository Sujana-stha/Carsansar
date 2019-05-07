import React, { Component } from 'react';
import {Editor} from '@tinymce/tinymce-react';

class TextEditorField extends Component {
    
    handleEditorChange(e) {
        console.log('Content was updated:', e.target.getContent())
        const content = e.target.getContent()
        if(content != "") {
            this.props.input.onChange(content)
        }
        
    }

    render() {
        const {input} = this.props
        return (
            <div className="col s12">
                <p>{this.props.label}</p>
                <Editor
                    initialValue={input.value == "" ? "<p>This is the initial content of the editor</p>": input.value}
                    init={{
                        height: 350,
                        plugins: 'advlist link image code help lists wordcount insertdatetime',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect | bullist numlist outdent indent | code | help'
                    }}
                    onChange={this.handleEditorChange.bind(this)}
                />
            </div>
        );
    }
}

export default TextEditorField;