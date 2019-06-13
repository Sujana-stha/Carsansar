import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import {notify} from 'react-notify-toast';

class EditImagePreview extends Component {
    
    // onDrop(images){
    //     console.log('tss', images)
    //     const newImages =  images.map((image) => {
    //         return Object.assign(image, {
    //             main_flag: false
    //         })
    //     })
    //     const imagesList =  this.props.input.value
        
    //     const newimagesList = imagesList.concat([...newImages]) 
        
    //     console.log('main', newimagesList)
    //     this.props.input.onChange(newimagesList);
    // }
    // onDropRejected(images){
    //     if(images.length){
    //         notify.show("Please upload valid image files.'Invalid MIME type", "error", 5000);
    //     }
    // }
    removeDroppedFile(path, e=null){
        console.log('ima', path)

        const images = this.props.input.value
        const newImagesList = images.filter(image=>{
            if(image.path) {
                return image.path !== path
            } else if(image.preview) {
                return image.preview !== path
            }
        })
        
        console.log('nn', newImagesList)
        this.props.input.onChange(newImagesList);
        console.log("input", this.props.input)
    }
    
    handleCover(path, e=null) {
        const images = this.props.input.value
        console.log('pre', path)
        const newImages = images.filter(image => {
            if((image.path === path) || (image.preview === path) ) {
                return Object.assign(image, {
                    main_flag: true
                })
            } else {
                return Object.assign(image, {
                    main_flag: false
                })
            }
        })
        
        console.log('hand', this.props)
        console.log('new-image', newImages)

        this.props.input.onChange(newImages)
    }
    render() {
        const {input} = this.props
        return (
            <div className="wr-uploader col s12">
                {input.value ? (
                    <div className="wr-images">
                        {input.value.map((image, index)=> 
                            <div key={index} className="wr-image-list">
                                <label>
                                    {image.main_flag === "1" && image.main_flag== true ? (
                                        <input type="radio" className="with-gap"
                                        defaultChecked
                                        onChange = {image.path ? this.handleCover.bind(this, image.path): this.handleCover.bind(this, image.preview)}
                                        name="file"
                                        />   
                                    ):(
                                        <input type="radio" className="with-gap"
                                        onChange = {image.path ? this.handleCover.bind(this, image.path): this.handleCover.bind(this, image.preview)}
                                        name="file"
                                        />
                                    )}
                                    <span>
                                        <div className="overlay">
                                            <button type="button" className="close"
                                            onClick={image.path ? this.removeDroppedFile.bind(this, image.path): this.removeDroppedFile.bind(this, image.preview)}
                                            >REMOVE</button>
                                        </div>
                                        {image.path ? (
                                            <img src={`/storage/${image.path}`} alt=""/>
                                            ): (
                                            <img src={image.preview} alt=""/>
                                        )
                                        }
                                        
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                ): null }
                {/* <div className="wr-dropzone-wrapper">
                    <DropZone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="drop-zone center-align"
                        accept="image/jpeg, image/png, image/gif, image/bmp"
                    >
                        <i className="material-icons">cloud_upload</i><br/>
                        <span className="dropzone-text">Drag n Drop Images Here !</span>
                    </DropZone>
                </div> */}
            </div>
        );
    }
}

export default EditImagePreview 