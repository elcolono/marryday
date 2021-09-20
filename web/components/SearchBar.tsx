import React from "react"

import {Row, Col, Form, Input, Label, Button} from "reactstrap"

import Select from "react-select"
import Link from "next/link"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SearchBar = (props) => {
    const {options, use_search, use_location_filter, use_product_category_filter} = props

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "0 solid #fff",
        }),
        indicatorSeparator: (provided, state) => ({
            display: "none",
        }),
        menu: (provided, state) => ({
            ...provided,
            color: "red",
            border: "0 solid #fff",
            boxShadow: "0 0 1.2rem rgba(0, 0, 0, .15)",
        }),
    }

    return (
        <div className={`search-bar ${props.className}`}>
            <Form>
                <Row>
                    {use_search && (
                        <Col
                            lg={(use_search && use_location_filter) && "4" || (use_search || use_location_filter) && "4" || "10"}
                            className="d-flex align-items-center form-group">
                            <Input
                                type="text"
                                name="search"
                                placeholder="What are you searching for?"
                                className="border-0 shadow-0"
                            />
                        </Col>
                    )}
                    {use_location_filter && (
                        <Col
                            lg={(use_search && use_location_filter) && "3" || (use_search || use_location_filter) && "5" || "10"}
                            md={props.halfInputs ? "6" : "12"}
                            className="d-flex align-items-center form-group"
                        >
                            <div className="input-label-absolute input-label-absolute-right w-100">
                                <Label for="location" className="label-absolute">
                                    <FontAwesomeIcon width={15} icon="crosshairs"/>
                                    <span className="sr-only">City</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    id="location"
                                    className="border-0 shadow-0"
                                />
                            </div>
                        </Col>
                    )}
                    {use_product_category_filter && (
                        <Col
                            lg={(use_search && use_location_filter) && "2" || (use_search || use_location_filter) && "5" || "10"}
                            md={props.halfInputs ? "6" : "12"}
                            className="d-flex align-items-center form-group no-divider"
                        >
                            <Select
                                id="reactselect"
                                options={options}
                                placeholder="Categories"
                                className="selectpicker"
                                classNamePrefix="selectpicker"
                                styles={customSelectStyles}
                                getOptionLabel={(option) => option.title}
                                getOptionValue={(option) => option.id}
                            />
                        </Col>
                    )}
                    <Col lg="2" className={props.btnMb ? `mb-${props.btnMb}` : ``}>
                        <Link href={'/coworking'}>
                            <Button
                                type="submit"
                                color="primary"
                                className={`btn-block h-100 ${props.btnClassName ? props.btnClassName : ""
                                }`}
                            >
                                Suchen
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchBar;
