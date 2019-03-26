import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import {notify} from 'react-notify-toast';

class ImagesPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            checked: true
        }
    }

    onDrop(images){
        console.log('tss', images)
        
        this.setState({
            images : this.state.images.concat([...images]),
        });
        const imagesList = this.state.images.map((image, index)=> {
            if(index === 0) {
                return Object.assign(image, {
                    main_flag: true
                })
            } else {
                return Object.assign(image, {
                    main_flag: false
                })
            }
           
        })
        console.log('main', imagesList)
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
        console.log('ima', this.state.images)
        console.log('new', newImages)
        this.props.input.onChange(newImages);
        
    }
    handleChange(e) {
        e.preventDefault();
        const images = this.state.images
        // if(images.length) {
        //    return this.props.input.onChange(images)
        // }
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
        console.log('hand', this.props)
        console.log('dfdf',newImages)

        this.props.input.onChange(newImages)
    }
    render() {
        const { input } = this.props;
        return (
            <div className="wr-uploader col s12">
                <div className="wr-dropzone-wrapper">
                    <DropZone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="drop-zone center-align"
                        accept="image/jpeg, image/png, image/gif, image/bmp"
                        // onChange= {this.handleChange.bind(this)}
                        // onChange={input.onChange(this.state.images)}
                    >
                        <i className="material-icons">cloud_upload</i><br/>
                        <span className="dropzone-text">Drag n Drop Images Here !</span>
                    </DropZone>
                </div>
                {this.state.images.length ? (
                    <div className="wr-images">
                        {this.state.images.map((file, index)=>
                            <div key={index} className="wr-image-list">
                                <label>
                                    {index === 0 ? (
                                        <input type="radio" className="with-gap"
                                        defaultChecked
                                        onChange = {this.handleCover.bind(this, file.preview)}
                                        name="file"
                                        />   
                                    ):(
                                        <input type="radio" className="with-gap"
                                        onChange = {this.handleCover.bind(this, file.preview)}
                                        name="file"
                                        />
                                    )}
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
                ):
                <div className="no-images">
                    <h5 className="text-center">
                        Selected images will appear here
                    </h5>
                </div> }
            </div>
        );
    }
}

export default ImagesPreview;