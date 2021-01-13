
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
    rentObjects: {
      name: 'rentObjects',
    },
    timeInterval: {
      name: 'timeInterval',
      label: 'Time interval*',
      requiredErrorMsg: 'Time interval is required'
    },
    rentObject: {
      name: 'rentObject',
      label: 'Rent object*',
      requiredErrorMsg: 'Rent object is required'
    },
    // firstName: {
    //   name: 'firstName',
    //   label: 'Vorname*',
    //   requiredErrorMsg: 'First name is required'
    // },
    // lastName: {
    //   name: 'lastName',
    //   label: 'Nachname*',
    //   requiredErrorMsg: 'Last name is required'
    // },
    email: {
      name: 'email',
      label: 'Email Adresse',
      requiredErrorMsg: 'Your email is required.'
    },
    completeCard: {
      name: 'completeCard',
      requiredErrorMsg: 'Your card is incomplete.'
    },
    emptyCard: {
      name: 'emptyCard',
      requiredErrorMsg: 'Your card number is required.'
    },
    checkPrice: {
      name: 'checkPrice',
    }

  }
};