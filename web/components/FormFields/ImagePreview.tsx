import CustomModal from "../CustomModal";
import {Spinner} from "reactstrap";
import Icon from "../Icon";
import React from "react";

const ImagePreview = (
    {
        image,
        isLoading = false,
        classes = "",
        onDelete,
    }
) => {
    const isPreview = image.preview ? true : false
    return (
        <div className={`${classes}mb-4`}>
            <img
                src={isPreview ? image.preview : image.image}
                className={`img-fluid rounded shadow`}
            />
            <CustomModal onAccept={onDelete}/>
            {isLoading && <Spinner size={'sm'}/>}
            <div className="card-img-overlay-top text-right">
                <a className="card-fav-icon position-relative z-index-40"
                   href="#">
                    <Icon icon="close-1" className="text-white"/>
                </a>
            </div>
        </div>
    );
}

export default ImagePreview
