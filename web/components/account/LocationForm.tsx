import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Col, FormGroup, Label, Row} from "reactstrap";
import AsyncSelect from 'react-select/async'
import {toast} from "react-toastify";
import fetchAPI from "../../utils/fetchAPI";
import {useFormikContext} from "formik";
import {InputField} from "../forms";
import getToken from "../../utils/getToken";

export default function LocationForm() {

    const {setFieldValue} = useFormikContext()

    const fetchOptions = async (inputValue) => {
        try {
            const token = getToken()
            const response = await fetchAPI(
                '/api/v1/locations/google-autocomplete',
                {
                    searchParams: [{key: "input", value: inputValue}],
                    token: token
                }
            )
            return response.predictions
        } catch (error) {
            toast.error(error.detail ?? "Something went wrong.")
        }
    }

    const onPredictionSelected = async (prediction) => {
        try {
            const token = getToken()
            const response = await fetchAPI(
                '/api/v1/locations/google-geocode',
                {
                    searchParams: [{key: "place_id", value: prediction.place_id}],
                    token: token
                }
            )
            setFieldValue('location', response);
        } catch (error) {
            toast.error(error.detail ?? "Something went wrong.")
        }
    }

    return (
        <Row className="form-block">
            <Col lg="4">
                <h4>Location</h4>
                <div>Map</div>
                <Alert className="mt-3" color="secondary">We won't publish your <b>street and number</b> to users
                    without your permission!</Alert>
                <p className="text-muted text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                </p>

            </Col>
            <Col lg="7" className="ml-auto">
                <FormGroup>
                    <Label className="form-label" for="autocomplete">
                        Search your address
                    </Label>
                    <AsyncSelect
                        id="autocomplete"
                        name="autocomplete"
                        autoFocus={true}
                        placeholder="Search..."
                        cacheOptions
                        loadOptions={fetchOptions}
                        getOptionLabel={option => option.description}
                        getOptionValue={option => option.place_id}
                        onChange={onPredictionSelected}
                    />
                </FormGroup>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label className="form-label" for="street">
                                Address
                            </Label>
                            <InputField
                                name="location.street"
                                id="street"
                                type="text"
                                placeholder=""
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label className="form-label" for="street_number">
                                Street number
                            </Label>
                            <InputField
                                name="location.street_number"
                                id="street_number"
                                type="text"
                                placeholder=""
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label className="form-label" for="city">
                        City
                    </Label>
                    <InputField
                        name="location.city"
                        id="city"
                        type="text"
                        placeholder=""
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="form-label" for="country">
                        Country
                    </Label>
                    <InputField
                        name="location.country"
                        id="country"
                        type="text"
                        placeholder=""
                        disabled
                    />
                </FormGroup>
            </Col>
        </Row>
    )
}