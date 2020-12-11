import { API_SERVER_URL } from '../lib/constants'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Form } from 'react-bootstrap'
import dynamic from "next/dynamic";

export default function BookingSection({ data }) {

    const [locations, setLocation] = useState([])
    const [rentObjects, setRentObjects] = useState([])

    useEffect(() => {
        if (locations.length == 0) {
            api.get('/cowork/locations/').then((response) => {
                if (response.status == 200) {
                    setLocation(response.data);
                } else {
                    console.log(response)
                }
            })
        }

    }, [])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const MapWithNoSSR = dynamic(() => import("./map"), {
        ssr: false
    });

    const customHandleChange = async (value, name, values, setValues) => {
        // Check target value wheter to conditionally make new request
        values[name] = value
        setValues(values)
        if (values.fm_location) {
            try {
                clearTimeout()
                // name == "fm_duration" && await sleep(2000);
                const response = await api.get(`/cowork/rentobjects?location=${values.fm_location.id}&type=${values.fm_objectType}&start=${values.fm_date}T${values.fm_startTime}Z&duration=${values.fm_duration}`)
                setRentObjects(response.data);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <section id="intro_section">
            <Formik
                initialValues={{
                    fm_location: '',
                    fm_objectType: 'desktop',
                    fm_date: '2020-12-09',
                    fm_rentObject: '',
                    fm_startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    fm_duration: 60,
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    setStatus(false)
                    setSubmitting(true)
                    const data = {
                        "rent_object": values.fm_rentObject,
                        "start": `${values.fm_date}T${values.fm_startTime}Z`,
                        "duration": values.fm_duration
                    }
                    try {
                        const response = await api.post('/cowork/bookings/', data)
                        setSubmitting(false)
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    status,
                    setValues,
                    /* and other goodies */
                }) => (
                        <div className="row no-gutters coming-soon">
                            <div className="col-lg-6 p-5">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h1 className="intro-section-title">{values.fm_location && values.fm_location.title}</h1>
                                        {/* <h1 className="intro-section-title">{data.heading}</h1> */}
                                        {/* <div dangerouslySetInnerHTML={{ __html: data.description }}></div> */}
                                        <Form onSubmit={handleSubmit} className="pt-3">
                                            <div className="form-group">
                                                <div className="radio">
                                                    <Field onChange={() => customHandleChange("desktop", "fm_objectType", values, setValues)} value="desktop" name="fm_objectType" type="radio" id="radio1" />
                                                    <label htmlFor="radio1">Dektop</label>
                                                </div>
                                                <div className="radio">
                                                    <Field onChange={() => customHandleChange("phone", "fm_objectType", values, setValues)} value="phone" name="fm_objectType" type="radio" id="radio2" />
                                                    <label htmlFor="radio2">Phone</label>
                                                </div>
                                                <div className="radio">
                                                    <Field onChange={() => customHandleChange("meeting", "fm_objectType", values, setValues)} value="meeting" name="fm_objectType" type="radio" id="radio3" />
                                                    <label htmlFor="radio3">Meeting</label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="date" className="form-control-label">Date</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Datum"
                                                    type="date"
                                                    onChange={(e) => customHandleChange(e.target.value, "fm_date", values, setValues)}
                                                    // onBlur={handleBlur}
                                                    value={values.fm_date}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="date" className="form-control-label">Start / End</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Datum"
                                                    type="time"
                                                    onChange={(e) => customHandleChange(e.target.value, "fm_startTime", values, setValues)}
                                                    // onBlur={handleBlur}
                                                    value={values.fm_startTime}
                                                />
                                            </div>
                                            <Form.Group controlId="formDuration">
                                                <Form.Label>Dauer</Form.Label>
                                                <Form.Control
                                                    min={15}
                                                    max={300}
                                                    step={15}
                                                    type="range"
                                                    name="fm_duration"
                                                    value={values.fm_duration}
                                                    onChange={(e) => customHandleChange(e.target.value, "fm_duration", values, setValues)}
                                                />
                                            </Form.Group>

                                            {/* Rent Objects */}
                                            <div className="form-group">
                                                {rentObjects && rentObjects.map((rentObject, i) => (
                                                    <div key={i}>
                                                        <label>
                                                            <Field type="radio" name="fm_rentObject" value={`${rentObject.id}`} />
                                                            {rentObject.title} ({rentObject.bookings.map(booking => (`${booking.start} - ${booking.end}`))})
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* {JSON.stringify(rentObjects)} */}
                                            {/* {JSON.stringify(availRentObjects)} */}

                                            {/* BOOKING BUTTON */}
                                            <button disabled={isSubmitting && true} type="submit" className="btn btn-danger btn-block">Buchen {isSubmitting && (<div className="spinner-border spinner-border-sm"></div>)}</button>
                                            <div className="text-danger mt-2">{status && status}</div>
                                            {JSON.stringify(values)}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-5">
                                <div id="map">
                                    <MapWithNoSSR />
                                </div>
                                <ul className="mt-5">
                                    {locations && locations.map((location, i) =>
                                        <li key={i} onClick={(e) => customHandleChange(location, "fm_location", values, setValues)}>
                                            {location.title} ({location.address}, {location.postcode}, {location.city})
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
            </Formik>
        </section>
    )
}