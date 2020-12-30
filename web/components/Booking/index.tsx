import React, { useState } from 'react';
import {
    Button,
    Spinner
} from 'reactstrap'
import ProgressBar from '../ProgressBar';

import { Formik, Form } from 'formik';

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

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });
        console.log(paymentMethod)
        ApiService.saveStripeInfo({
            email: values['email'],
            payment_method_id: paymentMethod.id
        })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error)
            })

        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);
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

    const progressWidth = {
        0: 33.33,
        1: 66.66,
        2: 100,
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
                                        {activeStep !== 0 && (
                                            <Button color="link" className="text-muted" onClick={_handleBack}>
                                                Zurück
                                            </Button>
                                        )}
                                        <div>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                // variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                block
                                            >
                                                {isLastStep ? 'Place order' : 'Weiter'}
                                            </Button>
                                            {isSubmitting && (
                                                <Spinner />
                                            )}
                                        </div>
                                    </div>
                                    {/* <pre >{JSON.stringify(values, null, 4)}</pre> */}

                                </Form>
                            )}
                        </Formik>
                    )}
            </React.Fragment>
        </React.Fragment>
    );
}
