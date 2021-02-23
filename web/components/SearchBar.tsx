import React from "react"

import { Row, Col, Form, Input, Label, Button } from "reactstrap"

import Select from "react-select"
import Link from "next/link"

const SearchBar = (props) => {
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

    const bookingTypes = [
        { label: "Meeting", value: 'meeting' },
        { label: "Arbeiten", value: 'work' },
    ]

    return (
        <div className={`search-bar ${props.className}`}>
            <Form>
                <Row>
                    {/* {JSON.stringify(props)} */}
                    <Col
                        lg="6"
                        md={props.halfInputs ? "6" : "12"}
                        className="d-flex align-items-center form-group"
                    >
                        <div className="input-label-absolute input-label-absolute-right w-100">
                            <Select
                                id="reactselect"
                                options={props.options}
                                // value={this.state.selectedFilter.subTag}
                                // onChange={this.setSubTag}
                                placeholder="Stadt"
                                className="selectpicker"
                                classNamePrefix="selectpicker"
                                styles={customSelectStyles}
                                getOptionLabel={(option) => option.title}
                                getOptionValue={(option) => option.slug}
                            />
                        </div>
                    </Col>
                    <Col
                        lg="4"
                        md={props.halfInputs ? "6" : "12"}
                        className="d-flex align-items-center form-group no-divider"
                    >
                        <Select
                            id="reactselect"
                            options={bookingTypes}
                            value={bookingTypes.filter(option => option.value == 'work')}
                            // onChange={this.setSubTag}
                            placeholder="Categories"
                            className="selectpicker"
                            classNamePrefix="selectpicker"
                            styles={customSelectStyles}
                        />
                    </Col>
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
