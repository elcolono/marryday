
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
    validCard: {
      name: 'validCard',
      label: 'Valid card',
      requiredErrorMsg: 'Card must be valid'
    },

  }
};