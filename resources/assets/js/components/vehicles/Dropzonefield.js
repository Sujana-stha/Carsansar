import React from "react";
import DropZone from "react-dropzone";
// import ImagePreview from "./imagePreview";
// import Placeholder from "./placeholder";

const DropZoneField = ({
  handleOnDrop,
  input,
  imagefile,
  label,
  meta: { error, touched }
}) => (
  <div className="">
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="btn"
      onDrop={handleOnDrop}
      onChange={file => input.onChange(file)}
    >
     Select Image
    </DropZone>
    {imagefile && imagefile.length > 0 ? (
        <div>
            {imagefile.map((file, index) => 
                <div key={index} className="image">
                    <span
                        className="close"
                        // onClick={this.removeDroppedFile.bind(this, file.preview)}
                    >X</span>
                    <img src={file.preview} alt=""/>
                </div>
            )}
        </div>
    ):null}
  </div>
);

export default DropZoneField;