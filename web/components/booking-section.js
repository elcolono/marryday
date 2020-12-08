import { API_SERVER_URL } from '../lib/constants'
import { Formik, Field, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function BookingSection({ data }) {

    const [locations, setLocation] = useState([])
    const [activeLocation, setActiveLocation] = useState(null)
    const [rentObjects, setRentObjects] = useState([])
    const [objectType, setObjectType] = useState(null)


    useEffect(() => {
        api.get('/cowork/locations/').then((response) => {
            if (response.status == 200) {
                setLocation(response.data);
            } else {
                console.log(response)
            }
        })
    }, [])


    const AutoReload = () => {
        const { values } = useFormikContext();
        console.log("Autoreload")
        if (values.objectType !== objectType && activeLocation) {
            api.get(`/cowork/rentobjects?location=${activeLocation}&type=${values.objectType}`).then((response) => {
                if (response.status == 200) {
                    setRentObjects(response.data);
                } else {
                    console.log(response)
                }
            })
            setObjectType(values.objectType)
        }
        return null
    }

    return (
        <section id="intro_section">
            <div className="row no-gutters coming-soon">
                <div className="col-lg-6">
                    <div className="banner-content banner-content-white">
                        <div className="container container-half">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1 className="intro-section-title">{data.heading} {activeLocation}</h1>
                                    {/* <div dangerouslySetInnerHTML={{ __html: data.description }}></div> */}
                                    <Formik
                                        initialValues={{
                                            objectType: 'desktop',
                                            date: '',
                                        }}
                                        onSubmit={(values, { setSubmitting, setStatus }) => {
                                            setStatus(false)
                                            setTimeout(() => {

                                            }, 400);
                                        }}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            status,
                                            /* and other goodies */
                                        }) => (
                                                <Form onSubmit={handleSubmit} className="pt-3">
                                                    <div className="form-group">
                                                        <div class="radio">
                                                            <Field type="radio" name="objectType" value="desktop" id="radio1" />
                                                            <label htmlFor="radio1">Dektop</label>
                                                        </div>
                                                        <div class="radio">
                                                            <Field type="radio" name="objectType" value="phone" id="radio2" />
                                                            <label htmlFor="radio2">Phone</label>
                                                        </div>
                                                        <div class="radio">
                                                            <Field type="radio" name="objectType" value="meeting" id="radio3" />
                                                            <label htmlFor="radio3">Meeting</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="date" className="form-control-label">Date</label>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Datum"
                                                            type="date"
                                                            name="date"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.date}
                                                        />
                                                        <div className="text-danger position-absolute">{errors.date && touched.date && errors.date}</div>
                                                    </div>

                                                    {/* Rent Objects */}
                                                    <AutoReload />
                                                    {JSON.stringify(rentObjects)}


                                                    {/* BOOKING BUTTON */}
                                                    <button type="submit" className="btn btn-danger btn-block">Buchen</button>
                                                    <div className="text-danger mt-2">{status && status}</div>
                                                    {JSON.stringify(values)}
                                                </Form>
                                            )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-5">
                    <ul className="mt-5">
                        {locations && locations.map((location, i) =>
                            <li key={i} onClick={() => setActiveLocation(location.id)}>{location.title}</li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
}
