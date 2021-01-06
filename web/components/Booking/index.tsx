import React, { useState } from 'react';
import {
    Button,
    Spinner
} from 'reactstrap'
import ProgressBar from '../ProgressBar';
import differenceInMinutes from 'date-fns/differenceInMinutes';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

// import AddressForm from './AddressForm';
import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';
import CheckoutSuccess from './CheckoutSuccess';

import validationSchema from './FormModel/validationSchema';
import bookingFormModel from './FormModel/bookingFormModel';
import formInitialValues from './FormModel/formInitialValues';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import useStyles from './stlyes';
import ApiService from '../../lib/api';

const steps = ['Booking details', 'Payment details'];

const { formId, formField } = bookingFormModel;

export default function CheckoutPage({ locationSlug }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    const stripe = useStripe();
    const elements = useElements();

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <BookingForm formField={formField} locationSlug={locationSlug} />;
            case 1:
                return <PaymentForm formField={formField} />;
            // case 2:
            //     return <ReviewOrder />;
            default:
                return <div>Not Found</div>;
        }
    }

    async function _submitForm(values, actions) {
        const card = elements.getElement(CardElement);
        const totalMinutes = differenceInMinutes(values['timeInterval'][1], values['timeInterval'][0]);
        const hourPrice = 6.95;
        const checkPrice = totalMinutes * (hourPrice / 60)

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });
        console.log(paymentMethod)
        ApiService.makeBooking({
            email: values['email'],
            payment_method_id: paymentMethod.id,
            start: values['timeInterval'][0],
            end: values['timeInterval'][1],
            rent_object: values['rentObject'].id,
            firstName: values['firstName'],
            lastName: values['lastName'],
            check_price: checkPrice
        })
            .then(response => {
                setActiveStep(activeStep + 1);
                toast.success("Booking was successful!");
                actions.setSubmitting(false);

            }).catch(error => {
                toast.error(`${error.response.data}`);
                actions.setSubmitting(false);
            })

    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <React.Fragment>
            <ProgressBar progress={(100 / steps.length) * (activeStep + 1)} />
            <React.Fragment>
                {activeStep === steps.length ? (
                    <CheckoutSuccess />
                ) : (
                        <Formik
                            initialValues={formInitialValues}
                            validationSchema={currentValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting, values }) => (
                                <Form id={formId} className="p-4 stripe-form">
                                    {_renderStepContent(activeStep)}

                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && !isSubmitting && (
                                            <Button color="link" className="text-muted" onClick={_handleBack}>
                                                Zurück
                                            </Button>
                                        )}
                                        <div>
                                            <Button
                                                id="submit-button"
                                                disabled={isSubmitting}
                                                type="submit"
                                                // variant="contained"
                                                color="primary"
                                                block
                                            >
                                                {isSubmitting ? <Spinner size={'sm'} /> : isLastStep ? 'Jetzt buchen' : 'Weiter'}
                                            </Button>
                                        </div>
                                    </div>
                                    {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}

                                </Form>
                            )}
                        </Formik>
                    )}
            </React.Fragment>
        </React.Fragment>
    );
}
