import React from "react";
import {FieldArray, useField} from "formik";
import DynamicFormField from "./DynamicFormField";
import {Button} from "reactstrap";

export default function CompoundField(props) {

    const {name, inputs, ...rest} = props;

    const [meta] = useField(props);
    const {value: values} = meta;


    return <FieldArray name={name}>
        {({remove, push}) => (
            <>
                {values && values.map((value, index) =>
                    <div key={index} className="mb-3">
                        {inputs &&
                        inputs.map((input) => {
                            const dynamicName = `${name}.${index}.${input.name}`
                            const dynamicInput = {
                                ...input,
                                name: dynamicName
                            }
                            return <DynamicFormField key={dynamicInput.name} input={dynamicInput}/>
                        })}
                        <div className="text-right">
                            <Button
                                type="button"
                                color="items"
                                className="btn-items-increase"
                                onClick={() => remove(index)}
                            >
                                -
                            </Button>
                            {values.length == index + 1
                                ? <Button
                                    type="button"
                                    color="items"
                                    className="btn-items-increase ml-2"
                                    onClick={() => push({})}
                                >
                                    +
                                </Button>
                                : null}
                        </div>
                    </div>
                )}
            </>
        )}
    </FieldArray>
}