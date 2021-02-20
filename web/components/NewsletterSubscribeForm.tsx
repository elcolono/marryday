import { Formik } from 'formik'
import * as Yup from 'yup'
import addSubscriber from '../api/addSubscriber';
import { toast } from 'react-toastify';
import { Form, Input, Button, Spinner } from "reactstrap"

const NewsletterSubscribeForm = () => (
    <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
            email: Yup.string()
                .email('Ungültige Email Adresse')
                .required('Erforderlich'),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {

            addSubscriber({
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
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (

            <Form id="newsletter-form" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <Input
                        placeholder="Email Adresse"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="bg-transparent border-dark border-right-0"
                    />
                    <div className="input-group-append">
                        <Button
                            disabled={isSubmitting}
                            className="btn-outline-dark border-left-0"
                            color="deoco"
                            type="submit"
                        >
                            {isSubmitting && <Spinner size={"sm"} /> || <i className="fa fa-paper-plane text-lg" />}

                        </Button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
)
export default NewsletterSubscribeForm;