import { API_SERVER_URL } from '../lib/constants'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Moment from 'moment';
import { extendMoment } from 'moment-range'
import { Form } from 'react-bootstrap'

export default function BookingSection({ data }) {

    const [locations, setLocation] = useState([])
    const [rentObjects, setRentObjects] = useState([])
    const [availRentObjects, setAvailRentObjects] = useState([])

    const moment = extendMoment(Moment);

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

    // const customTimeChange = (value, name, values, setValues) => {
    //     values[name] = value
    //     setValues(values)
    //     if (values.fm_startTime && values.fm_endTime) {
    //         // Create selected time range
    //         const start = moment(`${values.fm_date} ${values.fm_startTime}`);
    //         const end = moment(`${values.fm_date} ${values.fm_endTime}`);
    //         const range = moment.range(start, end);

    //         // Iterate bookings and check overlapping time ranges
    //         const availRentObjects = rentObjects && rentObjects.filter((rentObject) => {
    //             return rentObject.bookings.every(booking => {
    //                 const start = moment(booking.start);
    //                 const end = moment(booking.end);
    //                 const book_range = moment.range(start, end);
    //                 console.log(book_range.overlaps(range))
    //                 if (range.overlaps(book_range)) { return false }
    //                 return true
    //             })
    //         })
    //         console.log(availRentObjects)
    //         setRentObjects(availRentObjects)
    //     }
    // }

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
                onSubmit={(values, { setSubmitting, setStatus }) => {
                    setStatus(false)
                    setTimeout(() => {
                    }, 400);
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
                                            <button type="submit" className="btn btn-danger btn-block">Buchen</button>
                                            <div className="text-danger mt-2">{status && status}</div>
                                            {JSON.stringify(values)}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-5">
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
