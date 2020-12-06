import { API_SERVER_URL } from '../lib/constants'
import { Formik } from 'formik'
import { fetchAPI } from '../lib/api';
import Countdown from 'react-countdown';
import * as Yup from 'yup'

export default function LoginSection({ data }) {

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <div id="countdown">
                    <div class="timer-wrapper">
                        <div class="timer-data">{days}</div>
                        <span class="timer-text">Tage</span>
                    </div>
                    <div class="timer-wrapper">
                        <div class="timer-data">{hours}</div>
                        <span class="timer-text">Stunden</span>
                    </div>
                    <div class="timer-wrapper">
                        <div class="timer-data">{minutes}</div>
                        <span class="timer-text">Minuten</span>
                    </div>
                    <div class="timer-wrapper">
                        <div class="timer-data">{seconds}</div>
                        <span class="timer-text">Sekunden</span>
                    </div>
                </div>
            );
        }
    };

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
                                        initialValues={{ email: '', password: '' }}
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
                                                fetchAPI('/api/mailchimp-audience', { method: 'POST', body: { 'email': values.email } }).then((response) => {
                                                    // alert(JSON.stringify(response, null, 2));
                                                    console.log(response);
                                                    if (response.error) {
                                                        setStatus(response.error.title)
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
                                                <form onSubmit={handleSubmit} className="pb-5">
                                                    <div className="form-group">
                                                        <label for="email" class="form-control-label">Email</label>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Email Adresse"
                                                            type="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                        />
                                                        <div className="text-danger mt-2">{errors.email && touched.email && errors.email}</div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="password" class="form-control-label">Passwort</label>
                                                        
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
                                                            <button type="button" class="form-control-icon_wrapper icon-eye">
                                                                <span>
                                                                    <i class="eye-open ion-md-eye"></i>
                                                                    <i class="eye-close ion-md-eye-off d-none"></i>
                                                                </span>
                                                            </button>
                                                        </div>

                                                        <div className="text-danger mt-2">{errors.password && touched.password && errors.password}</div>
                                                    </div>
                                                    <div class="form-group d-flex align-items-center justify-content-between">
                                                        <div class="checkbox">
                                                            <input id='remember' type='checkbox' />
                                                            <label for="remember">Remember me</label>
                                                        </div>
                                                        <a href="#" class="link" data-dismiss="modal" data-toggle="modal" data-target="#forgot">Forgot Password?</a>
                                                    </div>
                                                    <button type="submit" class="btn btn-danger btn-block">Sign in</button>
                                                </form>
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
