import { API_SERVER_URL } from '../lib/constants'
import { Formik } from 'formik'
import { fetchAPI } from '../lib/api';

export default function ComingSoonSection({ data }) {

    return (
        <section id="intro_section">
            <div className="row no-gutters coming-soon">
                {/* <!-- Begin | Banner Content [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                <div className="col-lg-6 banner-content">
                    <div className="container container-half">
                        <div className="row">
                            <div className="col-md-10">
                                <h1 className="intro-section-title">{data.heading}</h1>
                                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

                                <Formik
                                    initialValues={{ email: '' }}
                                    validate={values => {
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
                                        setTimeout(() => {
                                            fetchAPI('/api/mailchimp-audience', { method: 'POST', body: { 'email': values.email } }).then((response) => {
                                                // alert(JSON.stringify(response, null, 2));
                                                console.log(response);
                                                if (response.error) {
                                                    setStatus({ error: response.error.title })
                                                } else {
                                                    setStatus({ success: "Erfolgreich hinzugefügt" })
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
                                                        <span><i className="ion-md-arrow-forward"></i></span>
                                                    </button>

                                                    {status && status.error && (
                                                        <div class="btn-inline mt-4">
                                                            <a href="#" class="btn btn-danger btn-only-icon btn-pill">
                                                                <i class="ion-ios-close"></i>
                                                            </a>
                                                            {status.error}
                                                        </div>
                                                    )}
                                                    {status && status.success && (
                                                        <div class="btn-inline mt-4">
                                                            <a class="btn btn-success btn-only-icon btn-pill">
                                                                <i class="ion-ios-checkmark"></i>
                                                            </a>
                                                            {status.success}
                                                        </div>
                                                    )}

                                                    <div className="text-danger mt-2">{errors.email && touched.email && errors.email}</div>
                                                </div>

                                            </form>
                                        )}
                                </Formik>
                                <div id="countdown"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End | Banner Content --> */}

                {/* <!-- Inner Banner [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                <div style={data.image ? { backgroundImage: `url(${API_SERVER_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner banner-ipad hero-coming"></div>
            </div>
        </section>
    )
}
