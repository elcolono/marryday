import { CardElement } from "@stripe/react-stripe-js";

import React, { useState } from 'react';
import { InputField } from '../FormFields';
import {
  Row,
  Col,
  Label,
  FormFeedback
} from "reactstrap";
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { useFormikContext } from 'formik';


export default function PaymentForm(props) {

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const {
    formField: { firstName, lastName, email }
  } = props;
  const { values, setFieldValue } = useFormikContext()

  const totalMinutes = differenceInMinutes(values['timeInterval'][1], values['timeInterval'][0]);
  const hourPrice = 6.95;
  const totalPrice = totalMinutes * (hourPrice / 60)


  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {

    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
      setFieldValue('validCard', event.complete)
    }
  }


  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  return (
    <React.Fragment>

      <div className="d-flex justify-content-between align-items-end mb-4">
        <h5 className="mb-0">Pay with your card</h5>
        <div className="text-muted">
          <i className="fab fa-cc-amex fa-2x mr-2" />
          <i className="fab fa-cc-visa fa-2x mr-2" />
          <i className="fab fa-cc-mastercard fa-2x" />
        </div>
      </div>

      <Row>
        {/* <Col md="6" className="form-group" key={firstName.name}>
          <Label for={firstName.name} className="form-label">
            {firstName.label}
          </Label>
          <InputField
            name={firstName.name}
            label={firstName.label}
            fullWidth
          />
        </Col>

        <Col md="6" className="form-group" key={lastName.name}>
          <Label for={lastName.name} className="form-label">
            {lastName.label}
          </Label>
          <InputField
            name={lastName.name}
            label={lastName.label}
            fullWidth
          />
        </Col> */}

        <Col md="12" className="form-group" key={email.name}>
          <Label for={email.name} className="form-label">
            {email.label}
          </Label>
          <InputField
            name={email.name}
            label={email.label}
            fullWidth
          />
        </Col>

        <Col md="12" className="form-group" >
          <Label for="card-element" className="form-label">
            Credit or debit card
          </Label>
          <CardElement
            className={`form-control ${error && 'border-danger'}`}
            id="card-element"
            onChange={handleChange}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <FormFeedback className="d-block">{error}</FormFeedback>
        </Col>

        <Col md="12">
          <div className="border-bottom py-3">
            <ul className="list-unstyled mb-0">
              {values['objectType'] == 'phone' ? <li className="mb-3"><i className="fas fa-phone fa-fw text-muted mr-2" />1 x Phonebox</li> :
                values['objectType'] == 'desktop' ? <li className="mb-3"><i className="fas fa-users fa-fw text-muted mr-2" />1 Desktop</li> :
                  values['objectType'] == 'meeting' ? <li className="mb-3"><i className="fas fa-users fa-fw text-muted mr-2" />1 Meeting</li> :
                    <i className="fas fa-users fa-fw text-muted mr-2" />
              }
              <li className="mb-0">
                <i className="far fa-calendar fa-fw text-muted mr-2" />
                {values['timeInterval'][0] && format(values['timeInterval'][0], 'MMM dd, yyyy HH:mm')}
                <i className="fas fa-arrow-right fa-fw text-muted mx-3" />
                {values['timeInterval'][1] && format(values['timeInterval'][1], 'MMM dd, yyyy HH:mm')}
              </li>
            </ul>
          </div>
        </Col>

        <Col md="12" className="form-group" >
          <div className="text-block pt-3 pb-0">
            <table className="w-100">
              <tbody>
                <tr>
                  <th className="font-weight-normal py-2">€ {(hourPrice / 60).toFixed(2)} x {totalMinutes} Minuten</th>
                  <td className="text-right py-2">€ {round(totalPrice)}</td>
                </tr>
                <tr>
                  <th className="font-weight-normal pt-2 pb-3">MwSt.</th>
                  <td className="text-right pt-2 pb-3">€ {round(totalPrice * 0.2)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-top">
                  <th className="pt-3">Total</th>
                  <td className="font-weight-bold text-right pt-3">€ {round(totalPrice)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </Col>

      </Row>
    </React.Fragment>
  );
}
