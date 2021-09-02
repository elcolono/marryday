import React from 'react'
import {Col, FormGroup, Label, Row} from "reactstrap";
import InputField from "./InputField";
import SelectField from "./SelectField";
import CustomInputField from "./CustomInputField";

const FormFieldsGenerator = (props) => {

    const {data, values} = props

    return (
        <>
            {data.formBlocks.map(block => (
                <Row className="form-block" key={block.title}>
                    <Col lg="4">
                        <h4>{block.title}</h4>
                        <p className="text-muted text-sm">{block.content}</p>
                    </Col>
                    <Col lg="7" className="ml-auto">
                        {block.inputs.map((input, index) => {
                            const nameArray = input.name && input.name.split('.')
                            const value = nameArray && values[nameArray[0]][nameArray[1]] || ""
                            return (
                                <React.Fragment key={index}>
                                    {input.type === "text" && (
                                        <FormGroup>
                                            <Label className="form-label" for={input.name}>
                                                {input.label}
                                            </Label>
                                            <InputField
                                                type={input.type}
                                                input={input.name}
                                                name={input.name}
                                                id={input.name}
                                                value={value}
                                            />
                                        </FormGroup>
                                    )}
                                    {input.type === "textarea" && (
                                        <FormGroup className="mb-5">
                                            <Label className="form-label" for={input.name}>
                                                {input.label}
                                            </Label>
                                            <InputField
                                                type={input.type}
                                                rows="5"
                                                input={input.name}
                                                name={input.name}
                                                id={input.name}
                                                value={value}
                                                aria-describedby={input.helpId}
                                            />
                                            <small
                                                id={input.helpId}
                                                className="form-text text-muted mt-2"
                                            >
                                                {input.help}
                                            </small>
                                        </FormGroup>
                                    )}
                                    {input.type === "select" && (
                                        <FormGroup>
                                            <Label className="form-label" for={input.name}>
                                                {input.label}
                                            </Label>
                                            <SelectField
                                                id={input.name}
                                                name={input.name}
                                                options={input.options}
                                                className="selectpicker"
                                                classNamePrefix="selectpicker"
                                                value={value}
                                            />
                                            {input.text && (
                                                <small
                                                    id="propertyTypeHelp"
                                                    className="form-text text-muted"
                                                >
                                                    {input.text}
                                                </small>
                                            )}
                                        </FormGroup>
                                    )}
                                    {input.type === "radios" && (
                                        <FormGroup>
                                            <Label className="form-label">{input.label}</Label>
                                            {input.radios.map((radio) => (
                                                <CustomInputField
                                                    key={radio.label}
                                                    type="radio"
                                                    id={radio.id}
                                                    name={radio.name}
                                                    value={radio.id}
                                                    checked={value === radio.id}
                                                    label={radio.label}
                                                />
                                            ))}
                                        </FormGroup>
                                    )}
                                    {input.type === "checkboxes" && (
                                        <FormGroup>
                                            <Label className="form-label">{input.label}</Label>
                                            <ul className="list-inline mb-0">
                                                {input.checkboxes.map((checkbox) => (
                                                    <li key={checkbox.id} className="list-inline-item">
                                                        <CustomInputField
                                                            type="checkbox"
                                                            id={checkbox.id}
                                                            name={checkbox.name}
                                                            value={value}
                                                            label={checkbox.label}
                                                            className="text-muted"
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </FormGroup>
                                    )}

                                </React.Fragment>
                            );
                        })}
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default FormFieldsGenerator