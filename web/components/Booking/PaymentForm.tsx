import React, { useState } from 'react';
import { InputField, DatePickerField } from '../FormFields';
import {
  Row,
  Col,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap"


export default function PaymentForm(props) {

  const [open, setOpen] = useState(false);
  const {
    formField: { firstName, lastName, email, nameOnCard, cardNumber, expiryDate, cvv }
  } = props;

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
        <Col md="6" className="form-group" key={firstName.name}>
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
        </Col>


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

        <Col md="6" className="form-group" key={nameOnCard.name}>
          <Label for={nameOnCard.name} className="form-label">
            {nameOnCard.label}
          </Label>
          <InputField
            name={nameOnCard.name}
            label={nameOnCard.label}
            fullWidth
          />
        </Col>

        <Col md="6" className="form-group" key={cardNumber.name}>
          <Label for={cardNumber.name} className="form-label">
            {cardNumber.label}
          </Label>
          <InputField
            name={cardNumber.name}
            label={cardNumber.label}
            fullWidth
          />
        </Col>

        <Col md="4" className="form-group" key={expiryDate.name}>
          <Label for={expiryDate.name} className="form-label">
            {expiryDate.label}
          </Label>

          <DatePickerField
            name={expiryDate.name}
            label={expiryDate.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
            open={open}
            onClose={() => setOpen(isOpen => !isOpen)}
            hidden
          />

          <InputGroup>
            <InputField
              name={expiryDate.name}
              label={expiryDate.label}
              fullWidth
              disabled
            />
            <InputGroupAddon addonType="append">
              <Button
                className="btn-items-increase"
                onClick={() => setOpen(isOpen => !isOpen)}
              ><i className="fa fa-calendar"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>

        </Col>

        <Col md="4" className="form-group" key={cvv.name}>
          <Label for={cvv.name} className="form-label">
            {cvv.label}
          </Label>

          <InputField name={cvv.name} label={cvv.label} fullWidth />
        </Col>

      </Row>
    </React.Fragment>
  );
}
