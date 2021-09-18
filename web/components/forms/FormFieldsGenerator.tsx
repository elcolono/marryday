import React from 'react'
import {Col, Row} from "reactstrap";
import DynamicFormField from "./DynamicFormField";

const FormFieldsGenerator = (props) => {

    const {data} = props

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
                            return (
                                <DynamicFormField key={index} input={input}/>
                            );
                        })}
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default FormFieldsGenerator