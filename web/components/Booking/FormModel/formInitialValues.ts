import checkoutFormModel from './bookingFormModel';
const {
  formField: {
    objectType,
    selectedDate,
    timeInterval,
    firstName,
    lastName,
    email,
    validCard
  }
} = checkoutFormModel;

export default {
  [objectType.name]: 'phone',
  [selectedDate.name]: new Date(),
  [timeInterval.name]: [],
  [firstName.name]: '',
  [lastName.name]: '',
  [email.name]: '',
  [validCard.name]: false,
};