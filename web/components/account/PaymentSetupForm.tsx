import React, { useEffect, useState } from 'react';
import { useStripe, useElements, IbanElement } from '@stripe/react-stripe-js';

import fetchAPI from "../../utils/fetchAPI";
import getToken from "../../utils/getToken";

import {
    Row,
    Col,
    Button,
    Form,
    Label,
    Spinner,
} from "reactstrap"

import { InputField } from "../forms";
import { Formik } from "formik";
import * as Yup from 'yup'


// Custom styling can be passed as options when creating an Element.
const IBAN_STYLE = {
    base: {
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        },
        ':-webkit-autofill': {
            color: '#32325d',
        },
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
            color: '#fa755a',
        },
    }
};
const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ['SEPA'],
    placeholderCountry: 'DE',
    style: IBAN_STYLE,
};


export default function PaymentSetupForm({
    user,
    paymentAccounts
}) {
    const stripe = useStripe();
    const elements = useElements();

    return (
        <Formik
            enableReinitialize={true}
            initialValues={user}
            validationSchema={Yup.object({
                card_name: Yup.string()
                    .required('Erforderlich'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const token = getToken();
                    const body = {
                        "stripe_customer_id": paymentAccounts[0].stripe
                    }
                    const response = await fetchAPI(`/api/v1/payments/receive-setup-intent-client-secret/`, { method: 'POST', body, token: token });
                    const iban = elements.getElement(IbanElement);
                    const result = await stripe.confirmSepaDebitSetup(response.data, {
                        payment_method: {
                            sepa_debit: iban,
                            billing_details: {
                                name: values.card_name,
                                email: user.email,
                            },
                        }
                    });
                } catch (error) {
                    throw error;
                }
            }}>
            {({
                handleSubmit,
                isSubmitting,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Row className="pt-4">

                        <Col md="6" className="form-group">
                            <Label for="card_name" className="form-label">
                                Kontoname
                                                            </Label>
                            <InputField
                                name="card_name"
                                id="card_name"
                                type="text"
                                placeholder="Max Mustermann"
                                autoComplete="off"
                                required
                            />
                        </Col>
                        <Col md="6" className="form-group">
                            <Label for="card_number" className="form-label">
                                Kontonummer
                            </Label>
                            <IbanElement className={"form-control"} options={IBAN_ELEMENT_OPTIONS} />
                        </Col>

                    </Row>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        color="outline-primary"
                        className=" mb-4">
                        {isSubmitting ? <Spinner size="sm" /> : "Speichern"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}