import React, { Component } from 'react';
    import DropZone from 'react-dropzone';
import {notify} from 'react-notify-toast';

class ImagesPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            checked: true,
        }
    }
    
    onDrop(images){
        this.setState({
            images: images.map((image) => {
                return Object.assign(image, {
                    main_flag: false
                })
            })
        });
        const imagesList = this.state.images
        this.props.input.onChange(imagesList);
    }
    onDropRejected(images){
        if(images.length){
            notify.show("Please upload valid image files.'Invalid MIME type", "error", 5000);
        }
    }
    removeDroppedFile(preview, e=null){
        const newImages = this.state.images.filter(image=> image.preview !== preview)
        this.setState({
            images : newImages
            
        })
        this.props.input.onChange(newImages);
        
    }
    handleChange(e) {
        e.preventDefault();
        const images = this.state.images
        
        this.props.input.onChange(images)
    }
    handleCover(preview, e=null) {

        const newImages = this.state.images.filter(image => {
            if(image.preview === preview) {
                return Object.assign(image, {
                    main_flag: true
                })
            } else {
                return Object.assign(image, {
                    main_flag: false
                })
            }
        })
        this.setState({
            images: newImages
        })

        this.props.input.onChange(newImages)
    }
    render() {
        
        return (
            <div className="wr-uploader col s12">
                {this.state.images.length ? (
                    <div className="wr-images">
                        {this.state.images.map((file, index)=>
                            <div key={index} className="wr-image-list">
                                <label>
                                        <input type="radio" className="with-gap"
                                        onChange = {this.handleCover.bind(this, file.preview)}
                                        name="file"
                                        />
                                    <span>
                                        <div className="overlay">
                                            <button type="button" className="close"
                                            onClick={this.removeDroppedFile.bind(this, file.preview)}
                                            >REMOVE</button>
                                        </div>
                                        <img src={file.preview} alt=""/>
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                ):null }
                <div className="wr-dropzone-wrapper">
                    <DropZone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="drop-zone center-align"
                        accept="image/jpeg, image/png, image/gif, image/bmp"
                    >
                        <i className="material-icons">cloud_upload</i><br/>
                        <span className="dropzone-text">Drag n Drop Images Here !</span>
                    </DropZone>
                </div>
                
            </div>
        );
    }
}

export default ImagesPreview;