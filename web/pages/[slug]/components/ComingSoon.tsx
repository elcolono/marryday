import { Formik } from 'formik'
import { fetchAPI } from '../../../lib/api';
import Countdown from 'react-countdown';
import * as Yup from 'yup'

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
                    <div className="timer-wrapper">
                        <div className="timer-data">{days}</div>
                        <span className="timer-text">Tage</span>
                    </div>
                    <div className="timer-wrapper">
                        <div className="timer-data">{hours}</div>
                        <span className="timer-text">Stunden</span>
                    </div>
                    <div className="timer-wrapper">
                        <div className="timer-data">{minutes}</div>
                        <span className="timer-text">Minuten</span>
                    </div>
                    <div className="timer-wrapper">
                        <div className="timer-data">{seconds}</div>
                        <span className="timer-text">Sekunden</span>
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
                                        // validationSchema={Yup.object({
                                        //     email: Yup.string()
                                        //         .email('Ungültige Email Adresse')
                                        //         .required('Erforderlich'),
                                        // })}
                                        onSubmit={(values, { setSubmitting, setStatus }) => {
                                            setStatus(false)
                                            setTimeout(() => {
                                                fetchAPI('/api/mailchimp-audience', { method: 'POST', body: { 'email': values.email } }).then((response) => {
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
                <div style={data.image ? { backgroundImage: `url(${process.env.CLIENT_API_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
            </div>
        </section>
    )
}
