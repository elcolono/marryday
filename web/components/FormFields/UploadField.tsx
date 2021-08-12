import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFormikContext} from "formik";
import {FormGroup, Row} from "reactstrap";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    const {setFieldValue, values} = useFormikContext();

    const onDrop = acceptedFiles => {
        const accumulatedFiles = [
            ...values['files'],
            ...acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        ]
        setFieldValue("files", accumulatedFiles)
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

    return (
        <FormGroup>
            <div className="container">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <div className="dz-message text-muted">
                        <p>Drop files here or click to upload.</p>
                        <p>
                          <span className="note">
                            (This is just a demo dropzone. Selected files are{" "}
                              <strong>not</strong> actually uploaded.)
                          </span>
                        </p>
                    </div>
                </div>

                <Row className="mt-4">
                    {values["files"] &&
                    values["files"].map((file) => (
                        <div key={file.name} className="col-lg-4">
                            <div>
                                <img
                                    src={file.preview}
                                    className="img-fluid rounded shadow mb-4"
                                />
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
        </FormGroup>

    )

}