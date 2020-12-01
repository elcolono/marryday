import { API_SERVER_URL } from '../lib/constants'
import { Formik } from 'formik'
import { fetchAPI } from '../lib/api';
import Countdown from 'react-countdown';

export default function ComingSoonSection({ data }) {

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
                                        initialValues={{ email: '' }}
                                        validate={(values) => {
                                            const errors = {};
                                            if (!values.email) {
                                                errors.email = 'Bitte ausfüllen';
                                            } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                            ) {
                                                errors.email = 'Ungültige Email';
                                            }
                                            return errors;
                                        }}
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
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-control-icon form-control-icon_right">
                                                        <input
                                                            className="form-control mt-3"
                                                            placeholder="Email Adresse"
                                                            type="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                        />
                                                        <button type="submit" disabled={isSubmitting} className="form-control-icon_wrapper">
                                                            {isSubmitting && (<div className="spinner-border spinner-border-sm"></div>) || (<span><i className="ion-md-arrow-forward"></i></span>)}
                                                        </button>
                                                        <div className="text-danger mt-2">{errors.email && touched.email && errors.email}</div>
                                                        <div className="text-danger mt-2">{status && status}</div>
                                                    </div>
                                                </form>
                                            )}
                                    </Formik>
                                    <Countdown
                                        date={new Date(data.timer)}
                                        renderer={renderer}
                                    />
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
