
export default {
  formId: 'bookingForm',
  formField: {
    objectType: {
      name: 'objectType',
      label: 'Object type*',
      requiredErrorMsg: 'Object type is required'
    },
    selectedDate: {
      name: 'selectedDate',
      label: 'Date*',
      requiredErrorMsg: 'Date is required'
    },
    timeInterval: {
      name: 'timeInterval',
      label: 'Time interval*',
      requiredErrorMsg: 'Time interval is required'
    },
    firstName: {
      name: 'firstName',
      label: 'Vorname*',
      requiredErrorMsg: 'First name is required'
    },
    lastName: {
      name: 'lastName',
      label: 'Nachname*',
      requiredErrorMsg: 'Last name is required'
    },
    email: {
      name: 'email',
      label: 'Email address',
      requiredErrorMsg: 'Email is required'
    },
    nameOnCard: {
      name: 'nameOnCard',
      label: 'Name on card*',
      requiredErrorMsg: 'Name on card is required',
      col: 6
    },
    cardNumber: {
      name: 'cardNumber',
      label: 'Card number*',
      requiredErrorMsg: 'Card number is required',
      invalidErrorMsg: 'Card number is not valid (e.g. 4111111111111)',
      col: 6
    },
    expiryDate: {
      name: 'expiryDate',
      label: 'Expiry date*',
      requiredErrorMsg: 'Expiry date is required',
      invalidErrorMsg: 'Expiry date is not valid',
      col: 4
    },
    cvv: {
      name: 'cvv',
      label: 'CVV*',
      requiredErrorMsg: 'CVV is required',
      invalidErrorMsg: 'CVV is invalid (e.g. 357)',
      col: 4
    }
  }
};