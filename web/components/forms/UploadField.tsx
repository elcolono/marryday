import React, {useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFormikContext} from "formik";
import {FormGroup, Row, Spinner} from "reactstrap";
import Icon from "../Icon";
import destroyProductImage from "../../api/products/destroyProductImage";
import {toast} from "react-toastify";
import CustomModal from "../CustomModal";
import addProductImage from "../../api/products/addProductImage";

const baseStyle = {
    flex: 1,
    display: 'flex',
    //flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function UploadField() {
    const {setFieldValue, setSubmitting, values} = useFormikContext();

    async function uploadImages(uploadImages) {
        const productId = values['id']
        const allImages = values['images']
        const copyAllImages = [...allImages]

        for (let image of uploadImages) {
            const productImage = await addProductImage(
                "test_name",
                image,
                productId
            );

            const index = copyAllImages.indexOf(image);
            copyAllImages[index] = productImage

            setFieldValue('images', copyAllImages)
        }
    }

    const onDrop = async acceptedFiles => {
        const extendedFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                isLoading: false
            })
        )
        const accumulatedFiles = [
            ...values['images'],
            ...extendedFiles
        ]
        setFieldValue("images", accumulatedFiles)
        await uploadImages(acceptedFiles)
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        onDrop,
    });


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const removeImage = async (image) => {
        setSubmitting(true)
        try {
            const destroyedProductImage = await destroyProductImage(image)
            const updatedImages = values['images']?.filter(image => image.uuid !== destroyedProductImage.uuid)
            await setFieldValue('images', updatedImages)
            toast.success('Image was deleted.')
            setSubmitting(false)
        } catch (error) {
            toast.error(error.detail ?? "Something went wrong.")
            setSubmitting(false)
        }
    }

    const ImagePreview = (
        {
            image,
            isLoading = false,
            classes = ""
        }
    ) => {
        const isPreview = image.preview ? true : false
        return (
            <div className={`${classes}mb-4`}>
                <img
                    src={isPreview ? image.preview : image.image}
                    className={`img-fluid rounded shadow`}
                />
                <CustomModal onAccept={() => removeImage(image)}/>
                {isLoading && <Spinner size={'sm'}/>}
                <div className="card-img-overlay-top text-right">
                    <a onClick={() => removeImage(image)} className="card-fav-icon position-relative z-index-40"
                       href="#">
                        <Icon icon="close-1" className="text-white"/>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <FormGroup>
            <div className="container">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <div className="dz-message text-muted">
                        <p>Drop images here or click to upload.</p>
                        <p>
                          <span className="note">
                            (This is just a demo dropzone. Selected files are{" "}
                              <strong>not</strong> actually uploaded.)
                          </span>
                        </p>
                    </div>
                </div>

                <Row className="mt-4">
                    {values["images"] &&
                    values["images"].map((file) => (
                        <div key={file.uuid} className="col-lg-4">
                            <div>
                                {file.image
                                    ? <ImagePreview image={file}/>
                                    : <ImagePreview image={file} isLoading={true} classes={'preview'}/>}
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
        </FormGroup>

    )

}