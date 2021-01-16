import { Formik } from 'formik'
import * as Yup from 'yup'
import ApiService from '../lib/api';
import { toast } from 'react-toastify';

const NewsletterSubscribeForm = () => (
    <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
            email: Yup.string()
                .email('Ungültige Email Adresse')
                .required('Erforderlich'),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {

            ApiService.addSubscriber({
                email: values['email'],
            })
                .then(response => {
                    toast.success("Erfolgreich angemeldet!");
                    setSubmitting(false);

                }).catch(error => {
                    toast.error(`${error.response.data}`);
                    setSubmitting(false);
                })
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
)
export default NewsletterSubscribeForm;