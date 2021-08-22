import React, { useState } from 'react';
import {
    Button,
    Spinner
} from 'reactstrap'
import ProgressBar from '../../../../components/ProgressBar';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';
import CheckoutSuccess from './CheckoutSuccess';

import validationSchema from './FormModel/validationSchema';
import bookingFormModel from './FormModel/bookingFormModel';
import formInitialValues from './FormModel/formInitialValues';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import useStyles from './stlyes';
import ApiService from '../../../../lib/api';

const steps = ['Booking details', 'Payment details'];

const { formId, formField } = bookingFormModel;

export default function CheckoutPage({ locationSlug, prices }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [createdBooking, setCreatedBooking] = useState(undefined);

    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    const stripe = useStripe();
    const elements = useElements();


    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <BookingForm formField={formField} locationSlug={locationSlug} prices={prices} />;
            case 1:
                return <PaymentForm formField={formField} prices={prices} />;
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
        ApiService.makeBooking({
            email: values['email'],
            payment_method_id: paymentMethod.id,
            start: values['timeInterval'][0],
            end: values['timeInterval'][1],
            rent_object: values['rentObject'].id,
            first_name: values['firstName'],
            last_name: values['lastName'],
            check_price: values['checkPrice'],
            location_slug: locationSlug,
        })
            .then(response => {
                setCreatedBooking(response.data)
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
                {activeStep === steps.length && createdBooking ? (
                    <CheckoutSuccess createdBooking={createdBooking} />
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
                                </Form>
                            )}
                        </Formik>
                    )}
            </React.Fragment>
        </React.Fragment>
    );
}
