import { API_SERVER_URL } from '../lib/constants'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default function BookingSection({ data }) {

    return (
        <section id="intro_section">
            <div className="row no-gutters coming-soon">
                <div className="col-lg-6">
                    <div className="banner-content banner-content-white">
                        <div className="container container-half">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1 className="intro-section-title">{data.heading}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

                                    <Formik
                                        initialValues={{
                                            objectType: 'desktop',
                                            date: '',
                                            email: '',
                                            password: ''
                                        }}
                                        validationSchema={Yup.object({
                                            email: Yup.string()
                                                .email('Ungültige Email Adresse')
                                                .required('Erforderlich'),
                                            password: Yup.string()
                                                .max(15, 'Ungültiges Passwort')
                                                .required('Erforderlich'),
                                        })}
                                        onSubmit={(values, { setSubmitting, setStatus }) => {
                                            setStatus(false)
                                            setTimeout(() => {
                                                login(values.email, values.password).then((response) => {
                                                    if (response.error) {
                                                        setStatus("Fehler bei Anmeldung")
                                                    } else {
                                                        setStatus("Erfolgreich angemeldet")
                                                    }
                                                    setSubmitting(false);
                                                })
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

                                                    <div className="form-group">
                                                        <label htmlFor="email" className="form-control-label">Email</label>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Email Adresse"
                                                            type="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                        />
                                                        <div className="text-danger position-absolute">{errors.email && touched.email && errors.email}</div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password" className="form-control-label">Passwort</label>

                                                        <div className="form-control-icon form-control-icon_right">
                                                            <input
                                                                id="password1"
                                                                className="form-control"
                                                                placeholder="Passwort"
                                                                type="password"
                                                                name="password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                            />
                                                            <button type="button" className="form-control-icon_wrapper icon-eye">
                                                                <span>
                                                                    <i className="eye-open ion-md-eye"></i>
                                                                    <i className="eye-close ion-md-eye-off d-none"></i>
                                                                </span>
                                                            </button>
                                                        </div>

                                                        <div className="text-danger position-absolute">{errors.password && touched.password && errors.password}</div>
                                                    </div>
                                                    <div className="form-group d-flex align-items-center justify-content-between">
                                                        <div className="checkbox">
                                                            <input id='remember' type='checkbox' />
                                                            <label htmlFor="remember">Remember me</label>
                                                        </div>
                                                        <a href="#" className="link" data-dismiss="modal" data-toggle="modal" data-target="#forgot">Forgot Password?</a>
                                                    </div>
                                                    <button type="submit" className="btn btn-danger btn-block">Sign in</button>
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
                <div style={data.image ? { backgroundImage: `url(${API_SERVER_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
            </div>
        </section>
    )
}
