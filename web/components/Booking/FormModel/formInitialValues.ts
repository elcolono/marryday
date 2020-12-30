import checkoutFormModel from './bookingFormModel';
const {
  formField: {
    objectType,
    selectedDate,
    timeInterval,
    firstName,
    lastName,
    email,
    nameOnCard,
    cardNumber,
    expiryDate,
    cvv
  }
} = checkoutFormModel;

export default {
  [objectType.name]: 'phone',
  [selectedDate.name]: new Date(),
  [timeInterval.name]: [],
  [firstName.name]: '',
  [lastName.name]: '',
  [email.name]: '',
  [nameOnCard.name]: '',
  [cardNumber.name]: '',
  [expiryDate.name]: '',
  [cvv.name]: ''
};