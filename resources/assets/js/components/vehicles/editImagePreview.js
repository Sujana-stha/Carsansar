import React, { Component } from 'react';

class EditImagePreview extends Component {

    removeDroppedFile(path, e = null) {
        const images = this.props.input.value
        const newImagesList = images.filter(image => {
            if (image.path) {
                return image.path !== path
            } else if (image.preview) {
                return image.preview !== path
            }
        })

        this.props.input.onChange(newImagesList);
    }

    handleCover(path, e = null) {
        const images = this.props.input.value
        const newImages = images.filter(image => {
            if ((image.path === path) || (image.preview === path)) {
                return Object.assign(image, {
                    main_flag: true
                })
            } else {
                return Object.assign(image, {
                    main_flag: false
                })
            }
        })
        this.props.input.onChange(newImages)
    }
    render() {
        const { input } = this.props
        return (
            <div className="wr-uploader col s12">
                {input.value ? (
                    <div className="wr-images">
                        {input.value.map((image, index) =>
                            <div key={index} className="wr-image-list">
                                <label>
                                    {image.main_flag === "1" && image.main_flag == true ? (
                                        <input type="radio" className="with-gap"
                                            defaultChecked
                                            onChange={image.path ? this.handleCover.bind(this, image.path) : this.handleCover.bind(this, image.preview)}
                                            name="file"
                                        />
                                    ) : (
                                            <input type="radio" className="with-gap"
                                                onChange={image.path ? this.handleCover.bind(this, image.path) : this.handleCover.bind(this, image.preview)}
                                                name="file"
                                            />
                                        )}
                                    <span>
                                        <div className="overlay">
                                            <button type="button" className="close"
                                                onClick={image.path ? this.removeDroppedFile.bind(this, image.path) : this.removeDroppedFile.bind(this, image.preview)}
                                            >REMOVE</button>
                                        </div>
                                        {image.path ? (
                                            <img src={`/storage/whrepo/${image.path}`} alt="" />
                                        ) : (
                                                <img src={image.preview} alt="" />
                                            )
                                        }

                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default EditImagePreview 