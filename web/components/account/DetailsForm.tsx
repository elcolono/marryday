import React, {useState} from 'react';
import {
    Row,
    Col,
    Label,
    FormFeedback,
    FormGroup
} from "reactstrap";
import {InputField} from "../forms";


export default function AddProductDetailsForm(props) {

    return (
        <Row className="form-block">
            <Col lg="4">
                <h4>Detail Informationen</h4>
                <p className="text-muted text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                </p>
            </Col>
            <Col lg="7" className="ml-auto">
                <FormGroup className="mb-5">
                    <Label className="form-label" for="condition">
                        Zustand
                    </Label>
                    <InputField
                        name="condition"
                        id="condition"
                        type="textarea"
                        rows="5"
                    />
                    <small
                        id="description"
                        className="form-text text-muted mt-2"
                    >
                        The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs,
                        pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.
                        'What's happened to me?' he thought. It wasn't a dream.
                    </small>
                </FormGroup>
            </Col>
        </Row>
    );
}
