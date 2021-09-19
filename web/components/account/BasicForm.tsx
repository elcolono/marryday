import React from 'react';
import {
    Row,
    Col,
    Label,
    FormGroup
} from "reactstrap";
import {InputField} from "../forms";
import SelectField from "../forms/SelectField";


export default function AddProductBasicForm(props) {

    return (
        <Row className="form-block">
            <Col lg="4">
                <h4>Basics</h4>
                <p className="text-muted text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                </p>
            </Col>
            <Col lg="7" className="ml-auto">
                <FormGroup>
                    <Label className="form-label" for="category">
                        Category
                    </Label>
                    <SelectField
                        id="category"
                        name="basics.categories"
                        autoFocus={true}
                        getOptionLabel={option => option.title}
                        getOptionValue={option => option.id}
                        options={props.categories}
                        className="selectpicker"
                        classNamePrefix="selectpicker"
                        isMulti
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="form-label" for="title">
                        Title
                    </Label>
                    <InputField
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Cooler Trailer"
                    />
                </FormGroup>
                <FormGroup className="mb-5">
                    <Label className="form-label" for="description">
                        Beschreibung
                    </Label>
                    <InputField
                        name="description"
                        id="description"
                        type="textarea"
                        rows="5"
                    />
                    <small
                        id="description"
                        className="form-text text-muted mt-2"
                    >
                        The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs,
                        pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.
                        &apos;What&apos;s happened to me?&apos; he thought. It wasn&apos;t a dream.
                    </small>
                </FormGroup>
            </Col>

        </Row>
    );
}
