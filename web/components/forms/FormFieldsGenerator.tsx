import React from 'react'
import {Col, Row} from "reactstrap";
import DynamicFormField from "./DynamicFormField";

export default function FormFieldsGenerator(props) {
    const {data} = props

    return (
        <>
            {data.formBlocks.map((
                {
                    classNames = ["form-block"],
                    contentWidth = {lg: "4"},
                    inputsWidth = {lg: "7"},
                    ...block
                }
            ) => (
                <Row className={classNames.join(" ")} key={block.title}>
                    <Col {...contentWidth}>
                        <h4>{block.title}</h4>
                        <p className="text-muted text-sm">{block.content}</p>
                    </Col>
                    <Col {...inputsWidth} className="ml-auto">
                        <Row>
                            {block.inputs.map((input, index) => {
                                return (
                                    <DynamicFormField key={index} input={input}/>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            ))}
        </>
    )
}

