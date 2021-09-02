import React, {useState} from 'react';
import {
    Row,
    Col,
    Label,
    FormFeedback,
    FormGroup
} from "reactstrap";
import {InputField} from "../../../../components/FormFields";
import UploadField from "../../../../components/FormFields/UploadField";


export default function AddProductImageForm(props) {

    return (
        <Row className="form-block">
            <Col lg="4">
                <h4>Images</h4>
                <p className="text-muted text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                </p>
            </Col>
            <Col lg="7" className="ml-auto">
                <FormGroup>
                    <UploadField />
                </FormGroup>
            </Col>

        </Row>
    );
}
