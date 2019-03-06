import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import {notify} from 'react-notify-toast';

class ImagesPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    onDrop(images){
        console.log('tss', images)
        this.setState({
            images : this.state.images.concat([...images])
        });

    }
    onDropRejected(images){
        if(images.length){
            notify.show("Please upload valid image files.'Invalid MIME type", "error", 5000);
        }
    }
    removeDroppedFile(preview, e = null){
        this.setState({
            images : this.state.images.filter((image) => {
                return image.preview !== preview
            })
        })
    }
    render() {
        return (
            <div className="wr-uploader">
                <div className="text-center">
                    <DropZone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="btn"
                        accept="image/jpeg, image/png, image/gif, image/bmp"
                    >
                        Select Images
                    </DropZone>
                </div>
                {this.state.images.length ? (
                    <div className="wr-images">
                        {this.state.images.map((file)=> 
                            <div key={file.preview} className="wr-image">
                                <span
                                    className="close"
                                    onClick={this.removeDroppedFile.bind(this, file.preview)}
                                >X</span>
                                <img src={file.preview} alt=""/>
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