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
import Decimal from 'decimal.js';


export default function PaymentForm(props) {

  const [error, setError] = useState(null);

  const {
    prices,
    formField: { email }
  } = props;
  const { values, errors, setFieldValue, setFieldError } = useFormikContext()
  const objectType = values['objectType'];
  const totalMinutes = differenceInMinutes(values['timeInterval'][1], values['timeInterval'][0]);
  const hourPrice =
    objectType == 'phone' ? prices.phone_hour && new Decimal(prices.phone_hour) :
      objectType == 'desktop' ? prices.desktop_hour && new Decimal(prices.desktop_hour) :
        objectType == 'meeting' ? prices.meeting_hour && new Decimal(prices.meeting_hour) : new Decimal(0)
  const totalPrice = hourPrice && hourPrice.dividedBy(60).mul(totalMinutes);


  React.useEffect(() => {
    setFieldValue('checkPrice', totalPrice.toFixed(2).toString());
  }, [])

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    console.log(event)
    if (event.error) {
      setFieldValue('completeCard', event.complete)
      setFieldError('completeCard', event.error.message);
    } else {
      setFieldValue('completeCard', event.complete)
      setFieldValue('emptyCard', event.empty)
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
          <FormFeedback className="d-block">{errors['emptyCard'] || errors['completeCard']}</FormFeedback>
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
                {values['timeInterval'][0] && format(values['timeInterval'][0], 'MMM dd, HH:mm')}
                <i className="fas fa-arrow-right fa-fw text-muted mx-3" />
                {values['timeInterval'][1] && format(values['timeInterval'][1], 'MMM dd, HH:mm')}
              </li>
            </ul>
          </div>
        </Col>

        <Col md="12" className="form-group" >
          <div className="text-block pt-3 pb-0">
            <table className="w-100">
              <tbody>
                <tr>
                  {/* <th className="font-weight-normal py-2">€ {(hourPrice / 60).toFixed(2)} x {totalMinutes} Minuten</th> */}
                  <th className="font-weight-normal py-2">€ {hourPrice && hourPrice.mul(0.8).toFixed(2).toString()} x {totalMinutes && totalMinutes / 60} Stunden</th>
                  <td className="text-right py-2">€ {totalPrice && totalPrice.mul(0.8).toFixed(2).toString()}</td>
                </tr>
                <tr>
                  <th className="font-weight-normal pt-2 pb-3">MwSt.</th>
                  <td className="text-right pt-2 pb-3">€ {totalPrice && totalPrice.mul(0.2).toFixed(2).toString()}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-top">
                  <th className="pt-3">Total</th>
                  <td className="font-weight-bold text-right pt-3">€ {values['checkPrice']}</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </Col>

      </Row>
    </React.Fragment>
  );
}
