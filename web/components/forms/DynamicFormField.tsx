import React from "react";
import {FormGroup, Label} from "reactstrap";
import InputField from "./InputField";
import SelectField from "./SelectField";
import CustomInputField from "./CustomInputField";
import CompoundField from "./CompoundField";

const DynamicFormField = ({input}) => {
    return (
        <>
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
                    />
                </FormGroup>
            )}
            {input.type === "textarea" && (
                <FormGroup>
                    <Label className="form-label" for={input.name}>
                        {input.label}
                    </Label>
                    <InputField
                        type={input.type}
                        rows="5"
                        input={input.name}
                        name={input.name}
                        id={input.name}
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
            {input.type === "multiselect" && (
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
                        isMulti
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
                            key={radio.value}
                            type="radio"
                            id={radio.value}
                            name={input.name}
                            value={radio.value}
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
                            <li key={checkbox.value} className="list-inline-item">
                                <CustomInputField
                                    type="checkbox"
                                    id={checkbox.value}
                                    name={input.name}
                                    value={checkbox.value || ""}
                                    label={checkbox.label}
                                    className="text-muted"
                                />
                            </li>
                        ))}
                    </ul>
                </FormGroup>
            )}
            {input.type === "compound" && (
                <FormGroup>
                    {input.label && <Label className="form-label text-lg">{input.label}</Label>}
                    {input.content && <p className="text-muted text-sm">{input.content}</p>}
                    <CompoundField
                        name={input.name}
                        inputs={input.inputs}
                    />
                </FormGroup>
            )}

        </>
    )
}

export default DynamicFormField